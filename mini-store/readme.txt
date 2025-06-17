--Instalación

    Vamos a comenzar intalando testing library, jest, fetch mock
        npm install --save-dev jest
        npm install --save-dev @testing-library/react


    --intalamos el package de jest fetch mock para mockear las peticiones a las APIs
        usamos el comando :
            npm install --save-dev jest-fetch-mock

--configuración
     podemos personalizar el comportamiento creando un archivo de config
    vamos a crear dicho archivo
    en la raiz del proyecto creamos un archivo llamado:
        jest.config.js

        creamos una configuración básica con module.exports = {verbose: true}
        esto hace que jest nos muestre más detalles en la consola al ejecutar pruebas

--pruebas
    dentro del folder de components vamos a crear el folder __tests__
    dentro de este folder irán tantos archivos como componentes tengamos trendráan la nomenclatura:
    Nombre.test.js

    me parece buen idea comenzar con el componete header, que es más sencillo
        dentro de tests creamos el archivo Header.test.js
            vamos a probar componentes de react, asi que importamos react
            abrimos un describe
            ahora vamos a utilizar una función de react testing libray llamada render
            render nos va a ayudar a renderizar el componente dentro de las pruebas

            vamos a almacenar el render en una variable para mayor practicidad
        
        importamos  screen para visualizar los datos de la pantalla desde testing library
            almacenamos el título del componente en la variable title
            hacemos un expect con la variable title como argumento y el método toBeInTheDocument
    corremos la prueba con el comando :
        npx jest

--debug
    nos dio error, parece que no está leyendo el jest config
    en la documentación de Jest nos aparece la config basica del jest.config.js
     copiamos la configuración desde la documentación y la pegamos en nuestro archivo
     creamos el archivo setupJest dentro de src
    
    parece que no esta leyendo la configuracion del setup jest porque no tenemos intalado jest-dom
    instalamos jest dom con el comando:
    npm install --save-dev @testing-library/jest-dom

    al comparar el package json de mi ministore con el de la leccion 1 de este modulo encuentro que me falta por instalar :
    @testing-library/dom
    @testing-library/user-event
    vamos a intalarlos con el comando 
    npm install --save-dev @testing-library/dom @testing-library/user-event

    aun me marca un error de sintaxis y dice que no se está leyendo un prop correctamente, parece que al tener instalado babel
    es necesario configurar babel para poder usar Jest
    segun copilot tenemos que crear un archivo de configuracion de babel, llamado babel.config.js a nivel raiz
        debe tener la config que le pasamo al archivo, es para  que se comunique con Jest

        además tenemos que tener instalado correctamente babel
         usamos el comando :
         npm install --save-dev @babel/preset-env @babel/preset-react babel-jest
    vamos a configura el jest.config.js para utilizar babel
        añadimos el codigo al archivo

    como aun no , en la consola nos manda unos links a la documentación, vamos a abrirlos y leerlos
le pedimos a chat gpt que nos diga que està fallando, y que tome la inforamcion de dichos sitios web

dice que intalemos babel core y demas:
    npm install --save-dev babel-jest @babel/core @babel/preset-env

configuramos babel:
    module.exports = {
    presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        '@babel/preset-react',
    ],
    };

dice que actualicemos jest,config.js
    transformIgnorePatterns: [
    '/node_modules/(?!axios)/',
  ],

verificar que nuestro archivo slice esté importando correctamente axios
    import axios from 'axios';

al final le pedi a blackbox que me ayudara, al parecer, si está bien lo de chat gpt, pero no habíamos instalado babel-jest, que era el traductor de JSX a JS

    
abrí una nueva ventana donde solo tengo el mini store para pedirle a blackbox que ma ayude a debugear pero aunque estaba la carpeta de __test__ 
ya no estaba la prueba al header que habíamos hecho, tendré que hacerlo de nuevo

al parecer, provar componentes en react con redux es un poco más dificil

dado que la app completa está envuelta en un provider, tambien tenemos que envolver el componente header en un provider para reenderizarlo

--Nota importantisima
    Si ejecutas el comando npm test con el escript por default de react, las pruebas fallan, pero si escribes npx jest pasan
    para evitar más confusines modificaremos el comando test del package json para que ejecute jest directamente


--Pruebas
    1. Pruebas del componente Header
        Archivo: tests/Header.test.js

        Objetivo: Verificar que el encabezado se renderiza correctamente. utilizamos el método render que tiene el componente envuelto en el provider

        Pruebas sugeridas:

        El título de la aplicación (Biblioteca Musical) se muestra correctamente. validamos que el título Mini-Store -- v 2.0 lo contenga el header con el método screen.getByText y hacemos el eexpect con 
        .toBeInTheDocument

        El svg del carrito se muestra correctamente, para ello utilizamos el método .toContain para verificar que svg está dentro del header
        además verificamos con una funcion mock que al hacer click en el svg, se llama la función toggleCart, para eso debemos simular el dispatch en la prueba, lo hacemos al principio
        ahora hacemos un beforeEach del render y el mockStore, para evitar repetir código

        migrar del render en cada prueba al beforeEach ha sido desafiante, parece que react o jest no reconoce correctamente mi svg, por lo que me da error
            pero en la pagina de svg viewer ví que hay un formato en react, que es tal cual un componente, vamos a añadirlo como componente extra dentro de la misma carpeta del header
        ese no era el problema, sino más bien que para hacer el mock de las funciones, tenía que envolverlas tambien en el beforeEach y dejarlas aisladas de el, además de cuidar que no se reendericen 
        demasiados items del mismo tipo y estilo al que estoy apuntando con el getByText o similar
    
    2 Pruebas del componente Cart
        En Cart hicimos un mock global de redux fuera del describe
        enseguida definimos varibles que utilizamos para mockear funciones del estado del diversas funciones
        dichas funciones las utilizamos dentro de un beforeEach que nos ayuda a repetir menos código
            --se prueba:
                -renderizado del componente Cart por medio del texto Your Cart
                -validación del estado inicial del carte con la leyenda your cart is empty
                -validacion de que se muestra el numero correcto de elementos agregados al carrito
                -validacion de que al hacer click en el boton remove de un item, se llama la función handleRemove
                -validacion de la llamada a la funcion toggleCart cuando se clickea el boton close
        -vamos a validar el estado del carrito, si está abierto o cerrado 
            para ello definimos la variable en el beforeEach isOpen
            al revizar el reducer de toggleCart nos dimos cuenta de que no está deifinido el payload, que es por el cual nos estamos basando para hacer la decision de que 
            accion despachar en el mock de redux,useDispatch
                procedemos a modificar el slice
                    añadimos una funcion llamada switchCart que regresa el payload y el estado contrario del carrito para que alterne entre abierto y cerrado
                    modificamos el reducer para que mande dos parametros a la funcion switchCart  
                volvemos a Cart.test
                    definimos isOpen den el beforeEach y lo asignamos al mockStore con el valor de falso
                    definimos isOpen como jest.fn() para mockearlo 
                    hacemos un console.log con templates para verificar el estado de isOpen
                        debería ser false
                        quería hacer que se llame la función real, pero como estamos mockeando, tenemos que hacer el cambio de false a true manualmente
                        actualizamos el estado con state = mockStore.getState();
                        despues de hacer click debería ser true
                        verificamos que se llame la funcion handleToggleCart
            olvida la parte el payload en el estado del carrito, la eliminé y sigue funcionado, podemos acceder al action por su tipo
                pase todas las funciones que se prueban como props y las definií en App, preferiria definirlas dentro de cada componente, pero es la forma en que
                funciona la prueba
            dado que la prueba de verificar la llamada de handleToggleCart y verificar si el estado del carrito es abierto o cerrado, aprendí un truco, encerramos ambas funciones
            en una tercera funcion a modo de callback, pero funciona

            ahora estamos refactorizando las pruebas del header 
                para ello utilizamos la store que configuramos en Cart con el configureStore y le pasamos las props 
                además utilizamos la funcion handleCloseClick que llama a handleToggleCart que utiliza el dispatch toggleCart
                 aun no entiendo bien como hacer que la store que esta dentro del beforeEach no se ejecute en una prueba específica
                 al utilizar el comando coverge nos enteramos de que falta por provar cosas en el cart
añadimos una prueba de atributos a productList
Hemos subido el porcentage de covertura en Cart, y notado que en productList, no falta verificar el fetch de los prodcutos cuendo el estado es IDLE

despues de hacer varios intentos, no era necesario añadir el middleware ala prueba jajajja
lo mismo de arriba a la hora de hacer la peticion mockeada con el método similar al del maestro

hicimos las pruebas para el slice, no fue tan dificil, era mucho sproud de los items y el stado inicial

el coverge dice que nos falta probar el error del try catch en el fetchProducts

5. Pruebas del componente App
--me cambie a utilizar el editor de codigo Trae de tik tok
    Archivo: tests/App.test.js

    Objetivo: Probar el flujo general de la aplicación de manera simplificada.

    Pruebas sugeridas:

        La aplicación renderiza los componentes Header, SearchBar, SearchResults y Library.

        Simula buscar canciones escribiendo en el input y verifica que los resultados se muestran correctamente.

        Simula agregar una canción a la biblioteca y verifica que aparece en la sección Library.

    Detalles:

        Proporciona funciones simuladas y datos ficticios para cada prueba.

        Usa fireEvent para interactuar con el input y los botones.

yo se que nos habían dicho que usaramos fireEvent para el manejo de errores, pero actualmente se utiliza
userEvent, que es una forma de interactuar con los componentes de forma mas natural, como si un usuario lo
haciera

despues de modificar la palabra succeeded en el slice y el status, corregimos todos los lugares donde no se estaba aplicando correctamente

hicimos las pruebas para el componente App, y como se puede ver, se utilizan las funciones simuladas y datos ficticios para cada prueba,
se reenderizan correctamente los componentes y las funciones básicas como añadir productos al carrito, removerlos y abrir o cerrar el carrito
funcionan correctamente


He hecho algunos ajustes ya que no se veia el contenido de mi pagina