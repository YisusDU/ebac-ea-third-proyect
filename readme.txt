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

Posteriormente iré al Cart a modificar los estilos responsivos y añadir un boton para ir a checkout.