
let saldo = 0
// Creamos la variable 'puntos' que almacenará un porcentaje de los depósitos del usuario
let puntos = 0
// Declaramos una variable con valor false para luego ocultar algunos elementos en la pantalla
let inputVisible = false
// Declaramos el boton y el formulario de depósito
let botonDeposito = document.getElementById('botonDeposito')
const formDeposito = document.getElementById('form-deposito')
// Seleccionamos el botón de la card de depósitos y le asignamos una clase 'visible' para que oculte o muestre 
// el formilario en la pantalla con la función toggleInput.
formDeposito.classList.add('visible')
botonDeposito.addEventListener('click', () => {
    toggleInput(formDeposito)
})
// Hacemos lo mismo pero con el boton y el form de extracciones
let botonExtraccion = document.getElementById('botonExtraccion')
const formExtraccion = document.getElementById('form-extraccion')
formExtraccion.classList.add('visible')
botonExtraccion.addEventListener('click', () => {
    toggleInput(formExtraccion)
})
// Declaramos un array para almacenar los depósitos y las extracciones, para crear un historial de ambas operaciones
let historialActividad = []
const historialLocalStorage = JSON.parse(localStorage.getItem('historial'))
if (historialLocalStorage) {
    // Si la constante 'historialLocalStorage' obtiene algo del mismo, entonces le damos ese valor al array
    // del historial y procedemos a mostrarlo en la pantalla a través de la fn mostrarHistorial
    historialActividad = historialLocalStorage
    mostrarHistorial(historialActividad)
}
// Seleccionamos el primer input del form donde el usuario va a poner el monto a depositar
let inputDeposito = formDeposito.getElementsByTagName('input')[0]
// Seleccionamos el input Submit y le asignamos un evento de click
let submitDeposito = document.querySelector('#deposito')
submitDeposito.addEventListener('click', (evt) => {
    // Tomamos el valor asignado por el usuario 
    let montoDeposito = Number(inputDeposito.value)
    if (montoDeposito <= 0) {
        evt.preventDefault()
        Toastify({
            text: "Ingrese un numero mayor que 0",
            duration: 3000,
            position: "left",
            }).showToast();
    } else {
        // Si es un número válido lo sumamos a la variable 'saldo', luego calculamos el 1% del valor y lo sumamos 
        // a la variable 'puntos', y luego lo alamacenamos en el storage para ussarlo con los canjes
        saldo += montoDeposito
        puntos += montoDeposito * 0.1
        // Bueno, acá la idea era mostrar la alerta, pero dado que el evento submit actualiza la página al instante no se llega a ver,
        // y al usar 'preventDefault' no se ejecuntan el resto de acciones como actualizar el saldo mostrado en pantalla, o mismo 
        // mostrar el historial, preferí darle prioridad a que se actualice todo en el momento y no se muestre la alerta.
        // Seguiré investigando cómo  hacer para que los datos se actualicen automáticamente aún con el 'preventDefault'.
        // Intenté hacerlo usando una promesa, pero no me dio resultado.
        Toastify({
            text: "Depósito realizado con éxito!",
            duration: 3000
            }).showToast();
        localStorage.setItem('saldo', saldo)
        localStorage.setItem('puntos', puntos)
        // Luego vaciamos el input
        inputDeposito.value = ''
        // Y creamos un objeto con el monto del depósito junto con la fecha y hora para almacenar en el historial
        // Lo pusheamos al array del hisotrial y cargamos el arrray en el storage
        const nuevoDeposito = { monto: montoDeposito, fecha: new Date().toLocaleString() }
        historialActividad.push(nuevoDeposito)
        localStorage.setItem('historial', JSON.stringify(historialActividad))
    }
})
// Y hacemos lo mismo pero con el formulario de extracciones
let inputExtraccion = formExtraccion.getElementsByTagName('input')[0]
let submitExtraccion = document.querySelector('#extraccion')
submitExtraccion.addEventListener('click', (evt)=> {
    let montoExtraccion = Number(inputExtraccion.value)
    if ((montoExtraccion <= 0) || (saldo < montoExtraccion)) {
        evt.preventDefault()
        Toastify({
            text: "Ingrese un numero mayor que 0",
            duration: 3000,
            position: "left",
            }).showToast();
    } else {
        // En este caso, si el monto es válido, le restamos ese valor al saldo almacenado y luego cargamos el nuevo saldo en el storage
        saldo -= montoExtraccion
        localStorage.setItem('saldo', saldo)
        Toastify({
            text: "Extraccón realizada con éxito!",
            duration: 3000
            }).showToast();
        inputExtraccion.value = ''
        // Acá el 'montoExtracción' lo guardamos en negativo para usarlo en la fn mostrarHisotrial
        const nuevaExtraccion = { monto: -montoExtraccion, fecha: new Date().toLocaleString() }
        historialActividad.push(nuevaExtraccion)
        localStorage.setItem('historial', JSON.stringify(historialActividad))
        formulario.submit()
    }
})
// Acá ocultamos la lista del historial, la cual se va a mostrar cuando pasemes el mouse por arriba de 'Actividad'
let botonHistorial = document.querySelector('#botonHistorial')
let historialContainer = document.getElementById('historialContainer')
historialContainer.classList.add('visible')
botonHistorial.addEventListener('mouseover', ()=> {
    toggleInput(historialContainer)
})
saldo = parseFloat(localStorage.getItem('saldo')) || 0
puntos = parseFloat(localStorage.getItem('puntos')) || 0
let saldoContainer = document.querySelector('.saldoContainer')
let saldoMostrado = saldoContainer.getElementsByTagName('h1')[0]
saldoMostrado.innerText = `Saldo: $${saldo}`
// Seleccionamos el botón para mostrar el saldo en dólares o en pesos. No pude hacer que al actualizar la página
// el saldo se quede en dólares, sino que el boton queda cambiado pero el saldo vuelve a pesos, pero seguiré trabajando en eso
let dolar = document.querySelector('.tipoDeMoneda')
// Luego consumimos la api del dólar
let url = 'https://dolarapi.com/v1/dolares/blue'
dolar.addEventListener('click', () => {
    fetch(url)
        .then(response => response.json())
        .then(data => render(data.venta))
        .catch(error => console.log(error))
})

// *********Acá empiezan las funciones**********
function render(data) {
    if (dolar.innerText == 'Dolar') {
        saldoMostrado.innerText = `Saldo: ${(saldo / data).toFixed(2)} $USD`
        dolar.innerText = 'Pesos'
    } else {
        saldoMostrado.innerText = `Saldo: $${saldo}`
        dolar.innerText = 'Dolar'
    }
}
// La fn toggleInput nos permite controlar la visualización de los form de extracción y depósito
function toggleInput(input) {
    input.classList.toggle('visible')
    inputVisible = !inputVisible
}
function mostrarHistorial(operacion) {
    // La fn 'mostrarHistorial' selecciona el contenedor del html donde se van a almacenar a modo de lista las actividades del usuario
    // utilizando como parámetro el array del historial
    const historialUl = document.getElementById('historialContainer')
    historialUl.innerHTML = ''
    operacion.forEach((op) => {
        // Entonces hacemos un forEach de cada objeto guardado en el array y creamos un 'li' por cada uno
        const li = document.createElement('li')
        if (op.monto < 0) {
            // Y como guardamos el montoExtracción en negativo, acá podemos aplicar la condición para que si el monto es negativo,
            // el item de la lsita creado corresponda a una extracción
            li.textContent = `Extracción de $${op.monto} realizada el ${op.fecha}`
            historialUl.appendChild(li)
            // y luego de hacer el append, le asignamos la clase 'extraccion' para darle color rojo a la letra
            li.classList.add('extraccion')
        } else if (op.monto > 0) {
            li.textContent = `Depósito de $${op.monto} realizado el ${op.fecha}`
            historialUl.appendChild(li)
            li.classList.add('deposito')
        }
    })
}
