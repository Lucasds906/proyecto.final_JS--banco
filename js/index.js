
let usuariosGuardados = JSON.parse(localStorage.getItem('usuarios'));
let usuariosArray = usuariosGuardados ? usuariosGuardados : [];
// let usuarios = localStorage.getItem(`usuario ${contador}`)
// let nuevoUsuario = {};
let botonSignUp = document.querySelector('button');
// Creamos el clon de la etiqueta 'template' que contiene el formulario para inicar sesión
let template = document.querySelector('template');
let contenido = template.content;
let mainIndex = document.querySelector('main');
let clon = contenido.cloneNode(true);

class User {
    constructor(nombre, email, contraseña) {
        this.nombre = nombre
        this.email = email
        this.contraseña = contraseña
    }
}


// Le damos evento al botón para que reenderice el clon en el main
botonSignUp.addEventListener('click', () => {
    mainIndex.appendChild(clon);
    // Seleccionamos el formulario clonado después de haberlo clonado y agregado al DOM para darle el evento 'submit'
    let formularioClonado = mainIndex.querySelector('form');
    // console.log("clon:", clon);
    // console.log("formularioClonado:", formularioClonado);
    if (formularioClonado) {
        formularioClonado.addEventListener('submit', (evt) => {
            evt.preventDefault();
            console.log(usuariosArray)
            contador++

            let inputs = formularioClonado.getElementsByClassName('datosUsuario');

            let nombre = inputs[0].value;
            let email = inputs[1].value.trim();
            // let email = inputs[1].value;
            let contraseña = inputs[2].value;

            let nuevoUsuario = new User(nombre, email, contraseña);

            let coincide = usuariosArray.some(elemento => {
                return elemento.email === email;
            });
            if (coincide) {
                console.log(`El email "${email}" ya está registrado.`);
                Swal.fire('¡Error!', 'El email ya está registrado.', 'error')
                contador--
            } else {
                console.log(`El valor "${email}" no coincide con ningún elemento del array.`);
                Swal.fire(`Bienvenido, ${inputs[0].value}! Su cuenta ha sido creada exitosamente`);
                // let nuevoUsuario = `${inputs[0].value},${inputs[1].value},${inputs[2].value},${contador}`
                usuariosArray.push(nuevoUsuario);
                localStorage.setItem('usuarios', JSON.stringify(usuariosArray));
                localStorage.setItem('contador', contador);
            }
        });
    }
});
contador = parseFloat(localStorage.getItem('contador')) || 0

document.querySelectorAll('button')[1].addEventListener('click', async () => {
    userArray = JSON.parse(localStorage.getItem('usuarios'))
    const { value: email } = await Swal.fire({
        title: "Input email address",
        input: "email",
        inputLabel: "Your email address",
        inputPlaceholder: "Enter your email address"
    });
    let usuarioVerificado = userArray.find((usuario) => usuario.email == email)
    
    if (usuarioVerificado) {
        localStorage.setItem('usuarioVerificado', JSON.stringify(usuarioVerificado))
        let usuarioPass = JSON.parse(localStorage.getItem('usuarioVerificado'))
        const { value: password } = await Swal.fire({
            title: "Enter your password",
            input: "password",
            background: '#000',
            inputPlaceholder: "Enter your password",
            inputAttributes: {
                maxlength: "10",
                autocapitalize: "off",
                autocorrect: "off"
            }
        });
        if (password == usuarioPass.contraseña) {
            window.location.href = "./pages/home.html"
        } else {
            Swal.fire('incorrecto')
        }
    } else {
        Swal.fire(`e-mail incorrecto`);
    }
})





