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







