
let puntos = Number(localStorage.getItem('puntos'))
// let canjeables = JSON.parse(sessionStorage.getItem('miArray'));
let posiblesCanjes = []
let arrayProductos = JSON.parse(localStorage.getItem('miArrayCanjes'));
console.log(sessionStorage)
console.log(localStorage)

let puntosContainer = document.querySelector('.misPuntos')
// let puntosMostrados = puntosContainer.getElementsByTagName('h1')[0]
puntosContainer.innerText = `Puntos: ${puntos}`
let containerCanje = document.querySelector('.posiblesCanjes')

actualizarProdcutos()

    botonCanje = containerCanje.querySelectorAll('.canjearProducto')
    botonCanje.forEach((boton, index) => {
        boton.addEventListener('click', () => {
            console.log(posiblesCanjes[index].puntos)
            puntos -= posiblesCanjes[index].puntos
            localStorage.setItem('puntos', puntos)
            puntosContainer.innerText = `Puntos: ${puntos}`
            containerCanje.innerHTML = ''
            actualizarProdcutos()
            
        })
    })

// actualizarProdcutos()

function actualizarProdcutos() {
    for (productos in arrayProductos) {
        if (puntos >= arrayProductos[productos].puntos) {
            containerCanje.innerHTML += `
            <article class="card">
            <div>
            <img src="./assets/img/banking (1) (1).png" alt="foto random">
                </div>
                <h2>${arrayProductos[productos].categoria}</h2>
                <input type="submit" class="canjearProducto">${arrayProductos[productos].puntos}
                </article>
                `
            console.log(`Puedes canjear tus puntos por ${arrayProductos[productos].info}.`)
            posiblesCanjes.push(arrayProductos[productos])
        }
    }
    if (puntos < 100) {
        containerCanje.innerHTML += `<h2>Tus puntos son insuficientes para realizar canjes. Por favor, ingrese más dinero para incrementar sus puntos</h2>`
        console.log('Tus puntos son insuficientes para realizar canjes. Por favor, ingrese más plata para incrementar sus puntos.')
    }
    
}


// function canjear() {
//     botonCanje = containerCanje.querySelectorAll('.canjearProducto')
//     botonCanje.forEach((boton, index) => {
//         boton.addEventListener('click', () => {
//             console.log(posiblesCanjes[index].puntos)
//             puntos -= posiblesCanjes[index].puntos
//             localStorage.setItem('puntos', puntos)
//             puntosContainer.innerText = `Puntos: ${puntos}`
//             containerCanje.innerHTML = ''
//             actualizarProdcutos()
            
//         })
//     })
// }




// else if (puntos < 100) {
//         alert('Tus puntos son insuficientes para realizar canjes. Por favor, ingrese más plata para incrementar sus puntos.')
//         seleccionarOpcion()
//     }
// }
// for (elementos in posiblesCanjes) {
//     let seleccion = prompt(`Para seleccionar el producto ${posiblesCanjes[elementos].info}, presiona ${elementos}. Tenés ${puntos} puntos. Presioná "enter" para pasar al siguiente producto.`)
//     if (seleccion == elementos) {
//         puntos -= posiblesCanjes[elementos].puntos
//         alert(`Felicidades! Has canjeado tus puntos por ${posiblesCanjes[elementos].info}. Te quedan ${puntos} puntos.`)
//         posiblesCanjes = []
//         seleccionarOpcion()
//     }
// }
// posiblesCanjes = []
