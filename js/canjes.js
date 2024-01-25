
let puntos = Number(localStorage.getItem('puntos')).toFixed(2)
let posiblesCanjes = []
let arrayProductos = JSON.parse(localStorage.getItem('miArrayCanjes'))
console.log(sessionStorage)
console.log(localStorage)

let puntosContainer = document.querySelector('.misPuntos')
puntosContainer.innerText = `Puntos: ${puntos}`
let containerCanje = document.querySelector('.posiblesCanjes')

actualizarProdcutos()

function canjear() {
    botonCanje = containerCanje.querySelectorAll('.canjearProducto')
    botonCanje.forEach((boton, index) => {
        boton.addEventListener('click', () => {
            console.log(posiblesCanjes[index].info)
            puntos -= posiblesCanjes[index].puntos
            localStorage.setItem('puntos', puntos)
            puntosContainer.innerText = `Puntos: ${puntos}`
            containerCanje.innerHTML = ''
            posiblesCanjes = []
            actualizarProdcutos()
        })
    })
}
function actualizarProdcutos() {
    arrayProductos.forEach((producto)=> {
        let puntosProducto = producto.puntos
        if (puntos >= puntosProducto) {
            containerCanje.innerHTML += `
            <article class="card">
            <div>
            <img src="../assets/img/banking (1) (1).png" alt="foto random">
                </div>
                <h2>${producto.info}</h2>
                <input type="submit" class="canjearProducto">${producto.puntos}
                </article>
                `
            console.log(`Puedes canjear tus puntos por ${producto.info}.`)
            posiblesCanjes.push(producto)
        }
    }) 
    if (puntos < 100) {
        containerCanje.innerHTML += `<h2>Tus puntos son insuficientes para realizar canjes. Por favor, ingrese más dinero para incrementar sus puntos</h2>`
        console.log('Tus puntos son insuficientes para realizar canjes. Por favor, ingrese más plata para incrementar sus puntos.')
    }
    canjear()
}
