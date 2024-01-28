// Declaramos un array vacío para almacenar los productos canjeados obtenidos del storage
let arrayCanjeados = []
let productosCanjeados = JSON.parse(localStorage.getItem('canjeado'))
// Pusehamos cada producto al array y lo guardamos en el storage
productosCanjeados.forEach((canjeado) => {
    arrayCanjeados.push(canjeado)
    localStorage.setItem('canjeRenderizado', JSON.stringify(canjeado))
})
// Reenderizamos los productos con la función 'renderCanjeado'
renderCanjeado()

function renderCanjeado() {
    let canjeadoContainer = document.querySelector('.productosCanjeados')
    canjeadoContainer.innerHTML = ''
    productosCanjeados.forEach((canjeado) => {
        canjeadoContainer.innerHTML += `
            <article class="card">
            <div>
            <img src="${canjeado.imgURL}" alt="${canjeado.producto}">
            </div>
            <h2>${canjeado.producto}</h2>
            </article>
        `
    })
}