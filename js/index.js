// Accedemos a los usuarios guardados en localStorage y le asiganmos el valor al array 'usuariosArray'
// si no hay ningún usuario creado, nos devolverá un array vacío
let usuariosGuardados = JSON.parse(localStorage.getItem('usuarios'));
let usuariosArray = usuariosGuardados ? usuariosGuardados : [];
let botonSignUp = document.querySelector('button');
// Creamos el clon de la etiqueta 'template' que contiene el formulario para crear la cuenta y lo asignaamos al botón 'Crear Cuenta'
let template = document.querySelector('template');
let contenido = template.content;
let mainIndex = document.querySelector('main');
let clon = contenido.cloneNode(true);
// creamos la clase 'User' para guardar los datos cargados por el usuario como un objeto, para luego tomarlo al momento de inciar sesión
class User {
    constructor(nombre, email, contraseña) {
        this.nombre = nombre
        this.email = email
        this.contraseña = contraseña
    }
}
// Le damos evento al botón para que reenderice el clon en el main
botonSignUp.addEventListener('click', () => {
    mainIndex.appendChild(clon)
    // Seleccionamos el formulario clonado después de haberlo clonado y agregado al DOM para darle el evento 'submit'
    let formularioClonado = mainIndex.querySelector('form')
    if (formularioClonado) {
        formularioClonado.addEventListener('submit', (evt) => {
            evt.preventDefault()
            let inputs = formularioClonado.getElementsByClassName('datosUsuario')
            let nombre = inputs[0].value
            let email = inputs[1].value.trim()
            let contraseña = inputs[2].value
            // Obtenemos los datos ingresados por el usuario y creamos un objeto
            let nuevoUsuario = new User(nombre, email, contraseña)
            let coincide = usuariosArray.some(elemento => {
                return elemento.email === email;
            })
            // Analizamos si el valor del email ya existe en el storage. Si ya hay un usuario guardado con ese email, entonces no se creará
            //el nuevo usuario. Si no existe, entonces dará 'false' y se creará el nuevo usuario
            if (coincide) {
                Swal.fire('¡Error!', 'El email ya está registrado.', 'error')
            } else {
                Swal.fire({
                    title: `Bienvenido, ${inputs[0].value}!`,
                    text: "Su cuenta ha sido creada exitosamente",
                    icon: "success"
                })
                // Cargamos el nuevo usuario en el array y luego lo almacenamos en el storage
                usuariosArray.push(nuevoUsuario)
                localStorage.setItem('usuarios', JSON.stringify(usuariosArray))
                inputs[0].value = ''
                inputs[1].value = ''
                inputs[2].value = ''
            }
        })
    }
})
// Seleccionamos el botón de 'Iniciar Sesión' y le pedimos al usuario que ingrese su email, tomando la base de datos del array de usuarios creados
document.querySelectorAll('button')[1].addEventListener('click', async () => {
    userArray = JSON.parse(localStorage.getItem('usuarios'))
    const { value: email } = await Swal.fire({
        title: "Input email address",
        input: "email",
        inputLabel: "Your email address",
        inputPlaceholder: "Enter your email address",
        background: '#000',
    })
    // Creamos la variable 'usuarioVerificado' y le damos el valor 'false'
    let usuarioVerificado = false
    // Analizamos si el array de usuarios tiene algún dato cargado, entonces daría 'true'. SI no lo tiene, entonces dará 'false' y pedirá que se 
    // cree un usuario primero.
    if (userArray) {
        // Buscamos en el array si algún email coincide con el ingresado por el usuario, y le asignamos ese valor a 'usuarioVerificado' 
        usuarioVerificado = userArray.find((usuario) => usuario.email == email)
        if (usuarioVerificado) {
            // Si encuentra un email, entonces guardamos el usuario verificado en el storage para luego llamarlo y comparar la contraseña ingresada 
            // por el usuario y ver que coincidad con la guardada en el objeto de dicho usuario
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
            })
            // Si todo es correcto, entonces mostramos la alerta y redirigimos a la página 'home'. Sino, la alerta dirá que los datos son incorrectos
            if (password == usuarioPass.contraseña) {
                window.location.href = "./pages/home.html"
            } else {
                Swal.fire('La contraseña es incorrecta')
            }
        } else {
            Swal.fire(`No existe una cuenta creada con ese email`)
        }
    } else {
        Swal.fire(`Primero debe crear una cuenta`)
    }
})