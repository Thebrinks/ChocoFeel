/*=============== PRODUCTOS ===============*/
/* Cada producto se escribe una sola vez aquí:
    - id: nombre corto sin espacios ni tildes, se usa en "sections" (abajo)
    - price / oldPrice: números sin puntos ni "COP" (el formato se añade solo).
      El precio sigue las reglas del armador (más abajo): BASE_PRICE + recargo
      del relleno (solo si se ve en la foto o lo dice el nombre) + recargo de
      la decoración que se ve en la foto
    - oldPrice: precio sin descuento en los productos en oferta; null si no tiene
    - offer: true muestra "Oferta" y el % de descuento (se calcula solo)
   - badges: etiquetas; su color se define en BADGE_COLORS
   - moods: emociones del producto (ids de "moods", al final del archivo)
   - decoration: la pintura que se ve en la foto (id de customOptions.decorations) */
const products = [
    {
        id: 'maracuya',
        name: 'Chocolate de Maracuyá',
        image: 'assets/img/shop/shop-products-1.webp',
        price: 5000,
        oldPrice: null,
        badges: ['Delicioso', 'Favorito'],
        moods: ['alegria'],
        decoration: 'degradado',
    },
    {
        id: 'frutos-rojos',
        name: 'Chocolate de Frutos Rojos',
        image: 'assets/img/shop/shop-products-2.webp',
        price: 5000,
        oldPrice: null,
        badges: ['Favorito', 'Recomendado'],
        moods: ['amor'],
        decoration: 'degradado',
    },
    {
        id: 'frutos-rojos-con-limon',
        name: 'Chocolate de Frutos Rojos con Limón',
        image: 'assets/img/shop/shop-products-3.webp',
        price: 5000,
        oldPrice: null,
        badges: ['Nuevo', 'Exclusivo'],
        moods: ['amor', 'energia'],
        decoration: 'degradado',
    },
    {
        id: 'arequipe-con-coco',
        name: 'Chocolate de Arequipe con Coco',
        image: 'assets/img/shop/shop-products-4.webp',
        price: 6000,
        oldPrice: null,
        badges: ['Premium', 'Delicioso'],
        moods: ['calma'],
        decoration: 'especial',
    },
    {
        id: 'espiral',
        name: 'Chocolate Espiral',
        image: 'assets/img/shop/shop-products-5.webp',
        price: 2800,
        oldPrice: 4000,
        offer: true,
        badges: [],
        moods: ['alegria'],
        decoration: 'sin-pintar',
    },
    {
        id: 'arequipe',
        name: 'Chocolate de Arequipe',
        image: 'assets/img/shop/shop-products-6.webp',
        price: 3200,
        oldPrice: 4000,
        offer: true,
        badges: ['Nuevo'],
        moods: ['calma', 'nostalgia'],
        decoration: 'sin-pintar',
    },
    {
        id: 'corazon',
        name: 'Chocolate de Corazón',
        image: 'assets/img/shop/shop-products-7.webp',
        price: 3600,
        oldPrice: 4000,
        offer: true,
        badges: [],
        moods: ['amor'],
        decoration: 'sin-pintar',
    },
    {
        id: 'mani-con-arequipe',
        name: 'Chocolate de Maní con Arequipe',
        image: 'assets/img/shop/shop-products-8.webp',
        price: 5000,
        oldPrice: null,
        badges: ['Nuevo', 'Delicioso'],
        moods: ['energia', 'calma'],
        decoration: 'sin-pintar',
    },
    {
        id: 'brownie',
        name: 'Chocolate de Brownie',
        image: 'assets/img/shop/shop-products-9.webp',
        price: 5000,
        oldPrice: null,
        badges: ['Delicioso', 'Recomendado'],
        moods: ['nostalgia'],
        decoration: 'sin-pintar',
    },
    {
        id: 'blanco',
        name: 'Chocolate Blanco',
        image: 'assets/img/shop/shop-products-22.webp',
        price: 4000,
        oldPrice: null,
        badges: ['Nuevo'],
        moods: ['calma'],
        decoration: 'sin-pintar',
    },
    {
        id: 'flan',
        name: 'Chocolate de Flan',
        image: 'assets/img/shop/shop-products-23.webp',
        price: 6000,
        oldPrice: null,
        badges: ['Delicioso', 'Exclusivo'],
        moods: ['nostalgia'],
        decoration: 'degradado',
    },
    {
        id: 'vino',
        name: 'Chocolate de Vino',
        image: 'assets/img/shop/shop-products-24.webp',
        price: 6500,
        oldPrice: null,
        badges: ['Premium', 'Delicioso', 'Exclusivo'],
        moods: ['amor'],
        decoration: 'degradado',
    },
    {
        id: 'manzana',
        name: 'Chocolate de Manzana',
        image: 'assets/img/shop/shop-products-11.webp',
        price: 5000,
        oldPrice: null,
        badges: ['Recomendado'],
        moods: ['nostalgia'],
        decoration: 'degradado',
    },
    {
        id: 'zafiro-de-frutos-rojos',
        name: 'Chocolate Zafiro de Frutos Rojos',
        image: 'assets/img/shop/shop-products-12.webp',
        price: 6000,
        oldPrice: null,
        badges: ['Premium', 'Favorito'],
        moods: ['amor'],
        decoration: 'especial',
    },
    {
        id: 'pina',
        name: 'Chocolate de Piña',
        image: 'assets/img/shop/shop-products-13.webp',
        price: 5000,
        oldPrice: null,
        badges: ['Delicioso', 'Nuevo'],
        moods: ['alegria'],
        decoration: 'degradado',
    },
    {
        id: 'prisma',
        name: 'Chocolate de Prisma',
        image: 'assets/img/shop/shop-products-15.webp',
        price: 3400,
        oldPrice: 4000,
        offer: true,
        badges: ['Nuevo'],
        moods: ['energia'],
        decoration: 'sin-pintar',
    },
    {
        id: 'concha-marina',
        name: 'Chocolate de Concha Marina',
        image: 'assets/img/shop/shop-products-14.webp',
        price: 4000,
        oldPrice: null,
        badges: ['Nuevo'],
        moods: ['calma'],
        decoration: 'sin-pintar',
    },
    {
        id: 'vortice-suave',
        name: 'Chocolate de Vórtice Suave',
        image: 'assets/img/shop/shop-products-16.webp',
        price: 4000,
        oldPrice: null,
        badges: ['Nuevo'],
        moods: ['calma'],
        decoration: 'sin-pintar',
    },
    {
        id: 'cacao-nativo',
        name: 'Chocolate de Cacao Nativo',
        image: 'assets/img/shop/shop-products-17.webp',
        price: 4000,
        oldPrice: null,
        badges: ['Nuevo'],
        moods: ['energia'],
        decoration: 'sin-pintar',
    },
    {
        id: 'corrientes-suaves',
        name: 'Chocolate de Corrientes Suaves',
        image: 'assets/img/shop/shop-products-18.webp',
        price: 4000,
        oldPrice: null,
        badges: ['Nuevo', 'Recomendado'],
        moods: ['calma'],
        decoration: 'sin-pintar',
    },
    {
        id: 'remolino-sublime',
        name: 'Chocolate de Remolino Sublime',
        image: 'assets/img/shop/shop-products-19.webp',
        price: 4000,
        oldPrice: null,
        badges: ['Nuevo'],
        moods: ['alegria'],
        decoration: 'sin-pintar',
    },
    {
        id: 'catedral-del-cacao',
        name: 'Chocolate Catedral del Cacao',
        image: 'assets/img/shop/shop-products-21.webp',
        price: 4000,
        oldPrice: null,
        badges: ['Premium', 'Nuevo', 'Recomendado'],
        moods: ['nostalgia'],
        decoration: 'sin-pintar',
    },
];

/*=============== COLORES DE LAS ETIQUETAS ===============*/
/* Clase CSS de styles.css que usa cada etiqueta */
const BADGE_COLORS = {
    Oferta: 'light-red',
    Delicioso: 'light-brown',
    Favorito: 'light-pink',
    Recomendado: 'dark-blue',
    Nuevo: 'light-blue',
    Exclusivo: 'dark-purple',
    Premium: 'light-yellow',
};

/*=============== SECCIONES ===============*/
/* Qué productos (por su id) aparecen en cada sección y en qué orden */
const sections = {
    featured: [
        'maracuya',
        'frutos-rojos',
        'frutos-rojos-con-limon',
        'arequipe-con-coco',
        'espiral',
        'arequipe',
        'corazon',
        'mani-con-arequipe',
        'brownie',
        'blanco',
        'flan',
        'vino',
    ],
    popular: [
        'vino',
        'arequipe-con-coco',
        'flan',
        'frutos-rojos-con-limon',
        'brownie',
        'maracuya',
        'manzana',
        'zafiro-de-frutos-rojos',
        'mani-con-arequipe',
        'blanco',
        'arequipe',
        'frutos-rojos',
    ],
    newAdded: [
        'pina',
        'prisma',
        'frutos-rojos-con-limon',
        'concha-marina',
        'vortice-suave',
        'arequipe',
        'cacao-nativo',
        'mani-con-arequipe',
        'corrientes-suaves',
        'blanco',
        'remolino-sublime',
        'catedral-del-cacao',
    ],
    newArrivals: [
        'pina',
        'prisma',
        'frutos-rojos-con-limon',
        'concha-marina',
        'vortice-suave',
        'arequipe',
        'cacao-nativo',
    ],
};

/*=============== SHOWCASE ===============*/
/* Las 4 columnas del showcase: qué productos (por su id) muestra cada una */
const showcase = {
    launches: ['vino', 'frutos-rojos', 'arequipe-con-coco'],
    offers: ['arequipe', 'espiral', 'corazon'],
    bestSellers: ['maracuya', 'frutos-rojos', 'zafiro-de-frutos-rojos'],
    trending: ['brownie', 'flan', 'frutos-rojos-con-limon'],
};

/*=============== PERSONALIZACIÓN ===============*/
/* Opciones del armador de bombones (personaliza.html).
    - extra: recargo por bombón en pesos (0 = sin recargo)
    - productId: en las formas, el producto del que se toma la imagen */
const BASE_PRICE = 4000;

/* Tamaño y peso aproximados de un bombón (moldes de 2,5 a 3 cm, de 8 a 12 g) */
const BONBON_SIZE_CM = 3;
const BONBON_WEIGHT_G = 12;

/* Costo del envío en Bogotá (0 = gratis). Se usa en el carrito y al finalizar la compra */
const SHIPPING_COST = 0;

const customOptions = {
    shapes: [
        { id: 'corazon', name: 'Corazón', extra: 0, productId: 'corazon' },
        { id: 'espiral', name: 'Espiral', extra: 0, productId: 'espiral' },
        { id: 'prisma', name: 'Prisma', extra: 0, productId: 'prisma' },
        { id: 'concha', name: 'Concha marina', extra: 0, productId: 'concha-marina' },
        { id: 'remolino', name: 'Remolino', extra: 0, productId: 'remolino-sublime' },
        { id: 'catedral', name: 'Catedral', extra: 0, productId: 'catedral-del-cacao' },
    ],
    chocolates: [
        { id: 'leche', name: 'De leche', extra: 0 },
        { id: 'oscuro', name: 'Oscuro', extra: 0 },
        { id: 'blanco', name: 'Blanco', extra: 0 },
    ],
    fillings: [
        { id: 'arequipe', name: 'Arequipe', extra: 0 },
        { id: 'coco', name: 'Coco', extra: 0 },
        { id: 'maracuya', name: 'Maracuyá', extra: 0 },
        { id: 'pina', name: 'Piña', extra: 0 },
        { id: 'frutos-rojos', name: 'Frutos rojos', extra: 0 },
        { id: 'limon', name: 'Limón', extra: 0 },
        { id: 'manzana', name: 'Manzana', extra: 0 },
        { id: 'mani', name: 'Maní', extra: 1000 },
        { id: 'flan', name: 'Flan', extra: 1000 },
        { id: 'brownie', name: 'Brownie', extra: 1000 },
        { id: 'avellana', name: 'Avellana', extra: 1000 },
        { id: 'caramelo-salado', name: 'Caramelo salado', extra: 1000 },
        { id: 'vino', name: 'Vino', extra: 1500 },
    ],
    decorations: [
        { id: 'sin-pintar', name: 'Sin pintar', extra: 0 },
        { id: 'un-color', name: 'Un color', extra: 500 },
        { id: 'degradado', name: 'Degradado o salpicado', extra: 1000 },
        { id: 'especial', name: 'Diseño especial (mármol, galaxia)', extra: 2000 },
    ],
    /* Colorantes comestibles para pintar el bombón (code = color en pantalla) */
    colors: [
        { id: 'amarillo', name: 'Amarillo', code: '#f5c518' },
        { id: 'naranja', name: 'Naranja', code: '#f08a24' },
        { id: 'rojo', name: 'Rojo', code: '#c62828' },
        { id: 'rosado', name: 'Rosado', code: '#f48fb1' },
        { id: 'morado', name: 'Morado', code: '#7b3fa0' },
        { id: 'azul', name: 'Azul', code: '#3b82c4' },
        { id: 'verde', name: 'Verde', code: '#3f9c5a' },
        { id: 'dorado', name: 'Dorado', code: '#c9a227' },
    ],
    boxes: [4, 6, 9, 12],
};

/*=============== EMOCIONES ===============*/
/* Cada emoción sugiere rellenos y colores (por su id en customOptions).
    Es una propuesta de marca: el cliente puede cambiar todo después */
const moods = [
    {
        id: 'alegria',
        name: 'Alegría',
        fillings: ['maracuya', 'pina'],
        colors: ['amarillo', 'naranja'],
    },
    {
        id: 'calma',
        name: 'Calma',
        fillings: ['arequipe', 'coco'],
        colors: ['azul', 'verde'],
    },
    {
        id: 'amor',
        name: 'Amor',
        fillings: ['frutos-rojos', 'vino'],
        colors: ['rojo', 'rosado'],
    },
    {
        id: 'nostalgia', 
        name: 'Nostalgia',
        fillings: ['flan', 'brownie', 'manzana'],
        colors: ['dorado', 'naranja'],
    },
    {
        id: 'energia',
        name: 'Energía',
        fillings: ['mani', 'limon'],
        colors: ['verde', 'morado'],
    },
];
