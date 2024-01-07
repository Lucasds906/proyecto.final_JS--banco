let nombre = prompt('Bienvenido. Para ingresar, escriba su nombre.')
let nombreUsuario = prompt(`Hola ${nombre}, por favor, cree su nombre de usuario.`)
let password = prompt('Ahora cree una contraseña alfanumérica')

alert(`Felicidades, ${nombre}. Su cuenta ha sido creada exitosamente. Inicie sesión para empezar a operar.`)

do {
    usuario = prompt('Ingrese su nombre de usuario.')
    contraseña = prompt('Ingrese su contraseña.')
} while ((usuario != nombreUsuario) || (contraseña != password));

alert('Ha iniciado sesión. Qué operación desea realizar?')

let saldo = 0
let puntos = 0
let productosDeCanje = []
let posiblesCanjes = []

class CELULAR {
    constructor(marca, modelo, espacio, ram, precio, puntos, categoria) {
        this.marca = marca
        this.modelo = modelo
        this.espacio = espacio
        this.ram = ram
        this.precio = precio
        this.puntos = puntos
        this.categoria = categoria
        this.info = `${marca}, ${modelo}, ${espacio}, ${ram}, ${precio}, ${puntos} puntos.`
    }
}

productosDeCanje.push(
    new CELULAR('Samnsung', 'S10', '128g', '6g', '$150.000', 3000, 'celulares'),
    new CELULAR('Xiamoi', 'Redmi 11', '128', '8g', '$100.000', 2000, 'celulares'),
    new CELULAR('Iphone', '14', '256g', '8g', '$500.000', 10000, 'celulares')
)

class COCINA {
    constructor(producto, material, tamaño, precio, puntos, categoria) {
        this.producto = producto
        this.material = material
        this.tamaño = tamaño
        this.precio = precio
        this.puntos = puntos
        this.categoria = categoria
        this.info = `${producto}, ${material}, ${tamaño}, ${precio}, ${puntos} puntos.`
    }
}
productosDeCanje.push(
    new COCINA('Olla', 'Acero inoxidable', '30cm de diámetro', '$15.000', 300, 'cocina'),
    new COCINA('Sartén', 'Aluminio', '35 cm de diámetro', '$20.000', 400, 'cocina'),
    new COCINA('Espátula', 'Madera', '40 cm', '$5.000', 100, 'cocina'),
)

class HOGAR {
    constructor(tipo, color, material, precio, puntos, categoria) {
        this.tipo = tipo
        this.color = color
        this.material = material
        this.precio = precio
        this.puntos = puntos
        this.categoria = categoria
        this.info = `${tipo}, ${color}, ${material}, ${precio}, ${puntos} puntos.`
    }
}
productosDeCanje.push(
    new HOGAR('Cortina', 'Negro', 'Lino', '$10.000', 200, 'hogar'),
    new HOGAR('Almohadón', 'Beige', 'plumas', '$25.000', 500, 'hogar'),
    new HOGAR('Silla', 'Blanco', 'Madera', '$18.000', 360, 'hogar'),
)

class INDUMENTARIA {
    constructor(prenda, genero, color, talle, precio, puntos, categoria) {
        this.prenda = prenda
        this.genero = genero
        this.color = color
        this.talle = talle
        this.precio = precio
        this.puntos = puntos
        this.categoria = categoria
        this.info = `${prenda}, ${genero}, ${color}, ${talle}, ${precio}, ${puntos} puntos.`
    }
}
productosDeCanje.push(
    new INDUMENTARIA('Remera', 'Hombre', 'Negro', '44', '$12.000', 240, 'indumentaria'),
    new INDUMENTARIA('Pantalón', 'Mujer', 'Jean', '38', '$10.000', 200, 'indumentaria'),
    new INDUMENTARIA('Buzo', 'Unisex', 'Azul', '40', '$19.000', 380, 'indumentaria')
)

class TECNOLOGIA {
    constructor(producto, marca, color, precio, puntos, categoria) {
        this.producto = producto
        this.marca = marca
        this.color = color
        this.precio = precio
        this.puntos = puntos
        this.categoria = categoria
        this.info = `${producto}, ${marca}, ${color}, ${precio}, ${puntos} puntos.`
    }
}
productosDeCanje.push(
    new TECNOLOGIA('Auriculares', 'Samsung', 'Negro', '$24.000', 480, 'tecnologia'),
    new TECNOLOGIA('Mouse gamer', 'Trust', 'Negro y rojo', '$30.000', 600, 'tecnologia'),
    new TECNOLOGIA('Webcam', 'Philips', 'Negro', '$50.000', 1000, 'tecnologia'),
)

seleccionarOpcion()

// ***************** FUNCIONES******************

function seleccionarOpcion() {
    let menu = Number(prompt('1. Consultar saldo. 2. realizar un depósito. 3. Extraer dinero. 4. Ver productos de canje. 5. Canjear puntos. 6. Cerrar sesión.'))
    if (menu == 1) {
        alert(`El saldo de tu cuenta es de $ ${saldo}`)
        let respuesta = confirm('Desea volver al menú anterior?')
        if (respuesta) {
            seleccionarOpcion()
        } else {
            return
        }
    } else if (menu == 2) {
        let deposito = Number(prompt('Ingrese la cantidad de dinero que desea depositar.'))
        if ((deposito <= 0) || (isNaN(deposito))) {
            alert('Por favor, debe ingresar un numero mayor que 0.')
            seleccionarOpcion()
        } else {
            alert(`Su depósito se efectuó correctamente. El saldo de su cuenta es de $ ${saldo += deposito}.`)
            puntos += deposito * 0.1
        }
        let respuesta = confirm('Desea volver al menú anterior?')
        if (respuesta) {
            seleccionarOpcion()
        } else {
            return
        }
    } else if (menu == 3) {
        let extraccion = Number(prompt('Ingresa el monto que deseas extraer'))
        if ((extraccion <= 0) || (isNaN(extraccion))) {
            alert('Por favor, ingrese un monto mayor que 0')
            seleccionarOpcion()
        } else if (extraccion > saldo) {
            alert('El saldo de tu cuenta es insuficinte para realizar la extracción. Debe ingresar un monto menor.')
            seleccionarOpcion()
        } else {
            alert(`La extración se realizó exitosamente. El saldo de tu cuenta ahora es de $ ${saldo -= extraccion}`)
        }
        let respuesta = confirm('Desea volver al menú anterior?')
        if (respuesta) {
            seleccionarOpcion()
        } else {
            return
        }
    } else if (menu == 4) {
        buscador = prompt('Para buscar un producto por categoría, escriba "celulares", "cocina", "hogar", "indumentaria", "tecnologia".')
        let productosFiltrados = buscarPorCategoria(productosDeCanje, buscador)
        for (items of productosFiltrados) {
            console.log(`***${items.info}***`)
        }
        let respuesta = confirm('Desea volver al menú anterior?')
        if (respuesta) {
            seleccionarOpcion()
        } else {
            return
        }
    } else if (menu == 5) {
        alert(`Llevas acumulados ${puntos} puntos`)
        for (productos in productosDeCanje) {
            if (puntos >= productosDeCanje[productos].puntos) {
                console.log(`Puedes canjear tus puntos por ${productosDeCanje[productos].info}.`)
                posiblesCanjes.push(productosDeCanje[productos])
            } else if (puntos < 100) {
                alert('Tus puntos son insuficientes para realizar canjes. Por favor, ingrese más plata para incrementar sus puntos.')
                seleccionarOpcion()
            }
        }
        for (elementos in posiblesCanjes) {
            let seleccion = prompt(`Para seleccionar el producto ${posiblesCanjes[elementos].info}, presiona ${elementos}. Tenés ${puntos} puntos. Presioná "enter" para pasar al siguiente producto.`)
            if (seleccion == elementos) {
                puntos -= posiblesCanjes[elementos].puntos
                alert(`Felicidades! Has canjeado tus puntos por ${posiblesCanjes[elementos].info}. Te quedan ${puntos} puntos.`)
                posiblesCanjes = []
                seleccionarOpcion()
            }
        }
        posiblesCanjes = []
        let respuesta = confirm('Desea volver al menú anterior?')
        if (respuesta) {
            seleccionarOpcion()
        } else {
            return
        }
    } else if (menu == 6) {
        alert('Gracias por confiar en nosotros, su sesión ha sido cerrada.')
        return
    } else {
        alert('La opción ingresada no es válida.')
        seleccionarOpcion()
    }
}

function buscarPorCategoria(productosDeCanje, categoria) {
    return productosDeCanje.filter(producto => producto.categoria === categoria)
}