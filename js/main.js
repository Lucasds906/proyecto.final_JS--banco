if (document.getElementById('mainIndex')) {
    let template = document.querySelector('template');
    let contenido = template.content;
    let main = document.querySelector('main');
    let boton = document.querySelector('button');

    boton.addEventListener('click', () => {
        let clon = contenido.cloneNode(true);
        main.appendChild(clon);

        let formularioClonado = document.querySelector('form');
        if (formularioClonado) {
            formularioClonado.addEventListener('submit', (evt) => {
                evt.preventDefault();
                window.location.href = "home.html";
            });
        }
    });
}

// localStorage.clear()

let arrayProductos = JSON.parse(localStorage.getItem('miArrayCanjes'));
console.log(localStorage)
let saldo = 0
let puntos = 0
let inputVisible = false

let botonDeposito = document.getElementById('botonDeposito')
const formDeposito = document.getElementById('form-deposito');
formDeposito.classList.add('visible')

botonDeposito.addEventListener('click', () => {
    toggleInput(formDeposito)
})

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
    }
})
saldo = parseFloat(localStorage.getItem('saldo')) || 0;
puntos = parseFloat(localStorage.getItem('puntos')) || 0;
// let saldoContainer = document.querySelector('.saldoContainer')
// let saldoStorage = saldo
// let saldoMostrado = saldoContainer.getElementsByTagName('h1')[0]
// saldoMostrado.innerText = `Saldo: $ ${saldoStorage}`


let botonExtraccion = document.getElementById('botonExtraccion')

const formExtraccion = document.getElementById('form-extraccion');
formExtraccion.classList.add('visible')
// console.log(inputTransfer)

botonExtraccion.addEventListener('click', () => {
    toggleInput(formExtraccion)
})
let inputExtraccion = formExtraccion.getElementsByTagName('input')[0]
let submitExtraccion = document.querySelector('#extraccion')
submitExtraccion.addEventListener('click', (evt) => {
    let montoExtraccion = Number(inputExtraccion.value)
    if (montoExtraccion <= 0) {
        evt.preventDefault()
        console.log('Ingrese un numero mayor que 0')
    } else {
        saldo -= montoExtraccion
        console.log(`Su depósito se efectuó correctamente. El saldo de su cuenta es de $ ${saldo}.`)
        
        localStorage.setItem('saldo', saldo)
        inputExtraccion.value = ''
    }
})
saldo = parseFloat(localStorage.getItem('saldo')) || 0;
let saldoContainer = document.querySelector('.saldoContainer')
let saldoStorage = saldo
let saldoMostrado = saldoContainer.getElementsByTagName('h1')[0]
saldoMostrado.innerText = `Saldo: $ ${saldoStorage}`

// let extraccion = Number(prompt('Ingresa el monto que deseas extraer'))
// if ((extraccion <= 0) || (isNaN(extraccion))) {
//     alert('Por favor, ingrese un monto mayor que 0')
//     seleccionarOpcion()
// } else if (extraccion > saldo) {
//     alert('El saldo de tu cuenta es insuficinte para realizar la extracción. Debe ingresar un monto menor.')
//     seleccionarOpcion()
// } else {
//     alert(`La extración se realizó exitosamente. El saldo de tu cuenta ahora es de $ ${saldo -= extraccion}`)
// }











function toggleInput(input) {

    input.classList.toggle('visible')
    console.log(input)
    // Cambiar el estado
    inputVisible = !inputVisible;
}




















// let form = document.getElementsByTagName('template')

// let submit = document.getElementById('buttonForm')

// submit.addEventListener('click', ()=> {
//     window.location.href = "home.html"
// })
// let nombre = prompt('Bienvenido. Para ingresar, escriba su nombre.')
// let nombreUsuario = prompt(`Hola ${nombre}, por favor, cree su nombre de usuario.`)
// let password = prompt('Ahora cree una contraseña alfanumérica')

// alert(`Felicidades, ${nombre}. Su cuenta ha sido creada exitosamente. Inicie sesión para empezar a operar.`)

// do {
//     usuario = prompt('Ingrese su nombre de usuario.')
//     contraseña = prompt('Ingrese su contraseña.')
// } while ((usuario != nombreUsuario) || (contraseña != password));

// alert('Ha iniciado sesión. Qué operación desea realizar?')







