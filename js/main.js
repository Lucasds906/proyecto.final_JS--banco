

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

localStorage.clear()

let inputVisible = false
let botonDeposito = document.getElementById('botonDeposito')

const inputDeposito = document.getElementById('form-deposito');
inputDeposito.classList.add('visible')

botonDeposito.addEventListener('click', () => {
    toggleInput(inputDeposito)
})

let botonTransfer = document.getElementById('botonTransfer')

const inputTransfer = document.getElementById('form-transfer');
inputTransfer.classList.add('visible')
console.log(inputTransfer)

botonTransfer.addEventListener('click', () => {
    toggleInput(inputTransfer)
})




function toggleInput(input) {

    input.classList.toggle('visible')
    console.log(input)
    // Cambiar el estado
    inputVisible = !inputVisible;
    // deposito.style.display = inputVisible ? 'flex' : 'none';
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







