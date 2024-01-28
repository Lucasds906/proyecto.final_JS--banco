// Declaramos el array que va almacenar todos los productos
let productosDeCanje = []
// Creamos una clase con los datos en común y luego creamos extends con los datos particulares de cada categoría
class Productos {
    constructor(categoria, producto, puntos, imgURL) {
        this.categoria = categoria
        this.producto = producto
        this.puntos = puntos
        this.imgURL = imgURL
        
    }
}
class Celular extends Productos {
    constructor(categoria, producto, puntos, imgURL, modelo, espacio, ram) {
        super(categoria, producto, puntos, imgURL)
        this.modelo = modelo
        this.espacio = espacio
        this.ram = ram
        this.info = `Teléfono: ${producto}, ${modelo}. ${espacio}, ${ram}.`
    }
}
class Indumentaria extends Productos {
    constructor(categoria, producto, puntos, imgURL, color, talla, genero) {
        super(categoria, producto, puntos, imgURL);
        this.color = color
        this.talla = talla
        this.genero = genero
        this.info = `${producto} de ${genero}, ${color}. Talle: ${talla}`
    }
}
class Cocina extends Productos {
    constructor(categoria, producto, puntos, imgURL, material) {
        super(categoria, producto, puntos, imgURL);
        this.material = material
        this.info = `${producto} de ${material}`
    }
}
class Hogar extends Productos {
    constructor(categoria, producto, puntos, imgURL, color, material,) {
        super(categoria, producto, puntos, imgURL)
        this.color = color;
        this.material = material
        this.info = `${producto} de ${material}, ${color}`
    }
}
class Tecnologia extends Productos {
    constructor(categoria, producto, puntos, imgURL, marca, color, bluethooth) {
        super(categoria, producto, puntos, imgURL)
        this.marca = marca
        this.color = color;
        this.bluethooth = bluethooth
        if (bluethooth) {
            this.info = `${producto} ${marca}, ${color}, con bluethooth`
        } else {
            this.info = `${producto} ${marca}, ${color}, sin bluethooth`
        }
    }
}
productosDeCanje.push(
    new Celular('Celular', 'Samsung', 3000, '../assets/img/s10.jpg', 'S10', 'Memoria: 128 gb', 'Ram: 6 g'),
    new Celular('Celular', 'Xiaomi', 2000, '../assets/img/redmi11.jpg', 'Redmi 11', 'Memoria: 128 gb', 'Ram: 8 g'),
    new Celular('Celular', 'Iphone', 10000, '../assets/img/iphone14.jpg', '14', 'Memoria: 246 gb', 'Ram: 10 g'),
)
productosDeCanje.push(
    new Indumentaria('Indumentaria', 'Remera', 240, '../assets/img/remera-hombre.jpg', 'Negro', '44', 'Hombre'),
    new Indumentaria('Indumentaria', 'Pantalón', 200, '../assets/img/jean-mujer.jpg', 'Jean', '38', 'Mujer'),
    new Indumentaria('Indumentaria', 'Buzo', 380, '../assets/img/buzo-hombre.jpg', 'Azul', '40', 'Hombre')
)
productosDeCanje.push(
    new Cocina('Cocina', 'Olla', 300, '../assets/img/olla-acero.jpg', 'Acero inoxidable'),
    new Cocina('Cocina', 'Sartén', 400, '../assets/img/sarten.jpg', 'Aluminio'),
    new Cocina('Cocina', 'Espátula', 100, '../assets/img/espatula.jpg', 'Madera'),
)
productosDeCanje.push(
    new Hogar('Hogar', 'Cortina', 200, '../assets/img/cortina.jpg', 'Negro', 'Lino'),
    new Hogar('Hogar', 'Almohadón', 500, '../assets/img/almohadon.jpg', 'Beige', 'Plumas'),
    new Hogar('Hogar', 'Silla', 360, '../assets/img/silla.jpg', 'Blanco', 'Plástico y madera'),
)
productosDeCanje.push(
    new Tecnologia('Tecnologia', 'Auriculares', 480, '../assets/img/auriculares.jpg', 'Samsung', 'Negro', true),
    new Tecnologia('Tecnologia', 'Mouse gamer', 600, '../assets/img/mouse.jpg', 'Trust', 'Negro y rojo', true),
    new Tecnologia('Tecnologia', 'Webcam', 1000, '../assets/img/webcam.jpg', 'Logitech', 'Negro', false),
)
// Guardamos el array en el storage para usarlo en otras páginas del sitio
localStorage.setItem('miArrayCanjes', JSON.stringify(productosDeCanje));
// Luego seleccionamos el contenedor en el que se va a reenderizar cada producto según su categoría
let containerCards = document.querySelector('.productosDeCanje')
let containerIndu = document.querySelector('.indumentaria')
let containerCocina = document.querySelector('.cocina')
let containerHogar = document.querySelector('.hogar')
let containerTecno = document.querySelector('.tecnologia')
// Y usando un 'forEach' sobre el array usamos la fn 'renderProducto' que utiliza como parámetros la categoría y el contenedor de destino
if (document.getElementById('mainProductos')) {
    productosDeCanje.forEach((producto) => {
        renderProducto('Celular', containerCards)
        renderProducto('Indumentaria', containerIndu)
        renderProducto('Cocina', containerCocina)
        renderProducto('Hogar', containerHogar)
        renderProducto('Tecnologia', containerTecno)
// La fn 'renderProducto' utiliza los parámetros asignados para comparar las categorías de los productos y para crear el 'innerHTML' en la locación indicada
    function renderProducto(clase, locacion) {
        if (producto.categoria == clase) {
            locacion.innerHTML += `
                <article class="card">
                <div>
                <img src="${producto.imgURL}" alt="${producto.categoria}">
                </div>
                <h2>${producto.producto}</h2>
                <h3>${producto.puntos} Puntos</h3>
                <button class="botonInfo">Ver más</button>
                </article>
                `
                
            }
        }
    })
}
let botonInfo = document.querySelectorAll('.botonInfo')
botonInfo.forEach((boton, index) => {
    boton.addEventListener('click', ()=> {
        Swal.fire(`${productosDeCanje[index].info}`)
    })
})