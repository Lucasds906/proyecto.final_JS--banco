// Declaramos un array que va a guardar los productos que hayan sido canjeados para luego usarlos en la pagina 'canjeados'
let arrayCanjeados = []
let canjeado = JSON.parse(localStorage.getItem(`canjeado`))
if (canjeado) {
    // Obtenemos del storage los productos que se hayan canjeado y los asingamos al array
    arrayCanjeados = canjeado
}
// Obtenemos los puntos guardados en el storage y creamos el array 'posiblesCanjes' 
// donde vamos a cargar los productos que se puedan canjear según los puntos
let puntos = Number(localStorage.getItem('puntos')).toFixed(2)
let posiblesCanjes = []
// Declaramos el array que va a almacenar los productos guardados en el storage
let arrayProductos = JSON.parse(localStorage.getItem('miArrayCanjes'))
// Mostramos los puntos en pantalla
let puntosContainer = document.querySelector('.misPuntos')
puntosContainer.innerText = `Puntos: ${puntos}`
// Seleccionamos el contenedor donde se van a mostrar los canjes posibles
let containerCanje = document.querySelector('.posiblesCanjes')
actualizarProdcutos()
// ********** Acá comienzan las funciones ************
function actualizarProdcutos() {
    // Esta función analiza cada objeto del array de productos
    arrayProductos.forEach((producto) => {
        // Para luego comparar los puntos del usuario con los puntos que vale cada producto, y si los puntos del usuario son mayores,
        // entonces el producto se trasnforma en un posible canje, y se reenderiza a través de 'innerHTML'
        let puntosProducto = producto.puntos
        if (puntos >= puntosProducto) {
            containerCanje.innerHTML += `
            <article class="card">
            <div>
            <img src="${producto.imgURL}" alt="${producto.producto}">
            </div>
            <h2>${producto.producto}</h2>
            <input type="submit" class="canjearProducto" value='Canjear'>${producto.puntos}
            </article>
            `
            // Y luego cargamos cada producto válido para canjear en el array 'posiblesCanjes'
            posiblesCanjes.push(producto)
        }
    })
    // Como no hay productos que valgan menos de 100 puntos, si los puntos son menores, no se mostrará ningún objeto
    if (puntos < 100) {
        containerCanje.innerHTML += `<h2>Tus puntos son insuficientes para realizar canjes. Por favor, ingrese más dinero para incrementar sus puntos</h2>`
    }
    canjear()
}
function canjear() {
    // La fn 'canjear' selecciona los botones de cada producto creado y guardado en el contenedor de canjes
    botonCanje = containerCanje.querySelectorAll('.canjearProducto')
    botonCanje.forEach((boton, index) => {
        // Le asignamos el evento 'click' a cada botón, y un índice
        boton.addEventListener('click', () => {
            // Al hacer click en un botón de canje, los puntos del producto se descuentan de los puntos del usuario y mostramos
            // una alerta con el producto canjeado y que permite ir a ver los productos que se canjearon con éxito
            puntos -= posiblesCanjes[index].puntos
            Toastify({
                text: `Has canjeado ${posiblesCanjes[index].producto} con éxito!
                Haz click aquí para ver los productos canjeados
                `,
                destination: '../pages/canjeados.html',
                style: {
                    background: 'red'
                },
                duration: 4000
                }).showToast();
            // Guardamos los nuevos puntos en el storage    
            localStorage.setItem('puntos', puntos)
            // Y pusheamos el producto canjeado al array de productos canjeados y lo guardamos en el storage
            arrayCanjeados.push(posiblesCanjes[index])
            localStorage.setItem(`canjeado`, JSON.stringify(arrayCanjeados))
            // Actualizamos los puntos del usuario
            puntosContainer.innerText = `Puntos: ${puntos}`
            // Vaciamos el contenedor de posibles canjes
            containerCanje.innerHTML = ''
            // Vaciamos el array
            posiblesCanjes = []
            // Y lo volvemos a cargar con la función 'actualizarProductos' basados en los nuevos puntos del usuario
            actualizarProdcutos()
        })
    })
}

