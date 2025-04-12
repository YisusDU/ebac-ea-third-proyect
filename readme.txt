He comenzado añadiendo las carpetas que hacian falta para cumplir con los requerimientos de la entrega, es decir, ahora tendremos:
    Deberá de tener las siguientes secciones:
        Login: formulario donde los usuarios ya registrados pueden ingresar
        Registro: formulario para registrar una nueva cuenta
        Home: deberá de contener la vista de productos
        Carrito: sección donde se mostrarán los productos elegidos para comprar
        Checkout: contendrá la vista para confirmar la compra e incluirá: una sección para ingresar una dirección de envío, un método de pago
        (formulario simulado con un botón que también simulara que se ha guardado el método de pago) y al final un botón para confirmar la compra
        Post-checkout: una vista que contendrá un mensaje de confirmación de la compra con detalles de la compra que se realizó

Primero haré los componentes, y despues los conectaré

Decidí añadir el index.js al login, quiero que sea algo similar a una pantalla dividida, con la bienvenida al centro
    al hacer hover a la derecha o izquierda, se hace más grande dicha sección, que corresponderá a inicar sesion o un link al registro
    dichos botones tendrán colores azul y rojo y la divison central tendrá un color de fondo de color negro y me gustaría que esté inclinada
    o con forma de rayo

para desplazarnos de una pestaña a la otra, utilizaremos react-router-dom, por lo que procedemos a instalarlo
ahora envolvemos el index root en el BrowserRouter

Pronto nos damos cuenta de que necesitamos una carpeta de themes para manejar estilos globales, así que procedemos a crearla
    debe ir dentro de src
    debe ir dentro de app
        EL ThemeProvider deber envolver los componentes dentro de app
        debe incluir un "componente llamado GlobalStyles
Dado que GlobalStyles está importando style-reset, procedemos a instalarlo

Luego de terminar los estilos responsivos, procedemos a crear el JSX del siguiente componente, para lo que comentamos el componente Login

Procedemos a crear el registro de usuarios
    añadimos estilos responsivos
    añadimos mixins

Revisé que en la pagina de EBAC nos piden un Home que tenga la vista de los productos, anteriormente estaba manejando esto 
por la union de varios componentes por separado, he decido crearlo e importar el header, el carrito y el productList

Enseguida crearé el componente Checkout e iré puliendo los estilos
En el componente Checkout utilizamos en mayor medida el Theme provider para utilizar un estilos más estandar, y añadimos estilos para el background en dark mode

Es hora de crear el componente Post-checkout, que contendrá un mensaje de confirmación de la compra con detalles

Ahora con los componentes diseñados, es momento de modificar el header component, abremos de añadir el logotipo del sitio, actualizar el título y
añadir una barra de búsqueda
    Añadir la logica del filtrado de elementos por medio de la barra de búsqueda es más complejo de lo que parece
    Empezamos modificando el slice para recibir el searchTerm en el estado, y añadimos un reducer para lo mismo
    Ahora añadimos una función en el header para despachar el termino de busqueda en el header
    Entonces modificamos el ProductsList para usar useMemo en el filtrado de los items

Ahora se me ocurre que podemos reutilizar las estructura del carrito para manejar el checkout y el post checkout
    Con el checkout:
    Al verificar la lógica del carrito, noté que no estaba mostrando los títulos de los productos, por lo que decidí arreglarlo
        para ello, solo verifiqué como se estaba nombrando en el componente ProductsList, que es donde se mandan al estado
        y corregí la llamada a la propiedad, que resultó ser title y no name
        tambien añadí algunos detalles estéticos para los títulos demasiado largos
    Además, quiero añadir un botón para llevar al checkout, dicho botón solo se muestra si hay items en el carrito, si no, el botón add some items cierra el carrito

Con los items añadidos al Checkout, deberíamos poder ver el total a pagar

una vez con el total a pagar, añadí un botón de regresar

Y después añadí una imagen al Checkout form, el estilo que usé me gustó tanto que lo voy a replicar en el login y el registry

Al intentar replicar el estilo en el Login, se generó un bug al aplicarse el media max width 768, recuerdame corregirlo, no se ve la imagen
*corregido

Ahora será bueno aplicar lo aprendido al registro de usuarios
