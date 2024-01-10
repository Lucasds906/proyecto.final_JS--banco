

let canjeables = JSON.parse(sessionStorage.getItem('miArray'));


let containerCanje = document.querySelector('.posiblesCanjes')

canjeables.forEach((canje)=> {
    containerCanje.innerHTML += `
    <article class="card">
            <div>
                <img src="./assets/img/banking (1) (1).png" alt="foto random">
            </div>
            <h2>${canje.categoria}</h2>
            <button><a href="./productos.html">${canje.puntos}</a></button>
        </article>
    `
})