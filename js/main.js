if (document.getElementById('mainIndex')) {
    let template = document.querySelector('template')
    let contenido = template.content
    let main = document.querySelector('main')
    let boton = document.querySelector('button')
    boton.addEventListener('click', () => {
        let clon = contenido.cloneNode(true)
        main.appendChild(clon)
        let formularioClonado = document.querySelector('form');
        if (formularioClonado) {
            formularioClonado.addEventListener('submit', (evt) => {
                evt.preventDefault()
                window.location.href = "home.html"
            })
        }
    });
}
// localStorage.clear()
let arrayProductos = JSON.parse(localStorage.getItem('miArrayCanjes'));
console.log(localStorage)
let saldo = 0
let puntos = 0
let inputVisible = false
let botonHistorial = document.getElementById('botonHistorialDepo')
let historialDepo = document.querySelector('ul')
historialDepo.classList.add('visible')
botonHistorial.addEventListener('click', () => {
    toggleInput(historialDepo)
})

let botonDeposito = document.getElementById('botonDeposito')
const formDeposito = document.getElementById('form-deposito')
formDeposito.classList.add('visible')

botonDeposito.addEventListener('click', () => {
    toggleInput(formDeposito)
})

document.addEventListener('DOMContentLoaded', () => {
    let historialDepositos = []
    const historialLocalStorage = JSON.parse(localStorage.getItem('historialDepositos'))
    if (historialLocalStorage) {
        historialDepositos = historialLocalStorage
        mostrarHistorial()
    }
    let inputDeposito = formDeposito.getElementsByTagName('input')[0]
    let submitDeposito = document.querySelector('#deposito')
    submitDeposito.addEventListener('click', (evt) => {
        let montoDeposito = Number(inputDeposito.value)
        if (montoDeposito <= 0) {
            evt.preventDefault()
            console.log('Ingrese un numero mayor que 0')
        } else {
            saldo += montoDeposito
            puntos += montoDeposito * 0.1
            console.log(`Su depósito se efectuó correctamente. El saldo de su cuenta es de $ ${saldo}.`)
            console.log(puntos)
            localStorage.setItem('saldo', saldo)
            localStorage.setItem('puntos', puntos)
            inputDeposito.value = ''
            const nuevoDeposito = { monto: montoDeposito, fecha: new Date().toLocaleString() }
            historialDepositos.push(nuevoDeposito)
            localStorage.setItem('historialDepositos', JSON.stringify(historialDepositos))
            mostrarHistorial()
        }
    })
    function mostrarHistorial() {
        const historialUl = document.getElementById('historialDepositos')
        historialUl.innerHTML = ''
        historialDepositos.forEach((deposito) => {
            const li = document.createElement('li')
            li.textContent = `Depósito de $${deposito.monto} realizado el ${deposito.fecha}`
            historialUl.appendChild(li)
        })
    }
})
saldo = parseFloat(localStorage.getItem('saldo')) || 0
puntos = parseFloat(localStorage.getItem('puntos')) || 0

let botonHistorialExtra = document.getElementById('botonHistorialExtra')
let historialExtra = document.querySelectorAll('ul')[1]
historialExtra.classList.add('visible')
botonHistorialExtra.addEventListener('click', () => {
    toggleInput(historialExtra)
})

document.addEventListener('DOMContentLoaded', () => {
    let historialExtracciones = []
    const extraccionesLocalStorage = JSON.parse(localStorage.getItem('historialExtracciones'))
    if (extraccionesLocalStorage) {
        historialExtracciones = extraccionesLocalStorage
        mostrarHistorial()
    }
    let inputExtraccion = formExtraccion.getElementsByTagName('input')[0]
    let submitExtraccion = document.querySelector('#extraccion')
    submitExtraccion.addEventListener('click', (evt) => {
        let montoExtraccion = Number(inputExtraccion.value)
        if ((montoExtraccion <= 0) || (saldo < montoExtraccion)) {
            evt.preventDefault()
            console.log('Ingrese un numero mayor que 0')
        } else {
            saldo -= montoExtraccion
            console.log(`Su extraccion se efectuó correctamente. El saldo de su cuenta es de $ ${saldo}.`)
            localStorage.setItem('saldo', saldo)
            inputExtraccion.value = ''
            const nuevaExtraccion = { monto: montoExtraccion, fecha: new Date().toLocaleString() }
            historialExtracciones.push(nuevaExtraccion)
            localStorage.setItem('historialExtracciones', JSON.stringify(historialExtracciones))
            mostrarHistorial()
        }
    })
    function mostrarHistorial() {
        const historialUl = document.getElementById('historialExtracciones')
        historialUl.innerHTML = ''
        historialExtracciones.forEach((extraccion) => {
            const li = document.createElement('li')
            li.textContent = `Depósito de $${extraccion.monto} realizado el ${extraccion.fecha}`
            historialUl.appendChild(li)
        })
    }
})

let botonExtraccion = document.getElementById('botonExtraccion')
const formExtraccion = document.getElementById('form-extraccion')
formExtraccion.classList.add('visible')

botonExtraccion.addEventListener('click', () => {
    toggleInput(formExtraccion)
})
saldo = parseFloat(localStorage.getItem('saldo')) || 0

let saldoContainer = document.querySelector('.saldoContainer')
let saldoMostrado = saldoContainer.getElementsByTagName('h1')[0]
saldoMostrado.innerText = `Saldo: $ ${saldo}`

function toggleInput(input) {
    input.classList.toggle('visible')
    console.log(input)
    inputVisible = !inputVisible
}






// let nombre = prompt('Bienvenido. Para ingresar, escriba su nombre.')
// let nombreUsuario = prompt(`Hola ${nombre}, por favor, cree su nombre de usuario.`)
// let password = prompt('Ahora cree una contraseña alfanumérica')

// alert(`Felicidades, ${nombre}. Su cuenta ha sido creada exitosamente. Inicie sesión para empezar a operar.`)

// do {
//     usuario = prompt('Ingrese su nombre de usuario.')
//     contraseña = prompt('Ingrese su contraseña.')
// } while ((usuario != nombreUsuario) || (contraseña != password));

// alert('Ha iniciado sesión. Qué operación desea realizar?')







