
const URL = 'http://localhost:3000/peliculas';
const form = document.getElementById('form');
const search = document.getElementById('search');
const h1 = document.querySelector('h1');

const getData = async (url) => {
    try {
        const resp = await fetch(url);
        const data = await resp.json();
        return data;

    } catch (error) {
        console.log(error);
        return null;
    }
}
const printCards = (arreglo, contenedor) => {
    contenedor.innerHTML = '';
    arreglo.forEach(element => {
        const { name, puntaje, genero, img } = element;
        contenedor.innerHTML += `
        
        <div >
            <img src= "${img}">
             <p>${name}</p>
            <p>${puntaje}</p>
            <p>${genero}</p>
        </div>

    
        `

    });
}
//paso 2 funcion para filtrar datos
const dataNombre = async (valor) => {
    const cards = document.querySelector('.cards');
    let nombres = await getData(URL);
    //console.log(nombres);
    cards.innerHTML = '';
    nombres.forEach(e => {
        const { name, genero, puntaje, img } = e
        if (valor === name) {
           cards.innerHTML += `
    <div class="cards">
    <div >
        <img src= "${img}">
         <p>${name}</p>
        <p>${puntaje}</p>
        <p>${genero}</p>
    </div>

</div>
    `

        } else if(valor === genero){
            cards.innerHTML += `
    <div class="cards">
    <div >
        <img src= "${img}">
         <p>${name}</p>
        <p>${puntaje}</p>
        <p>${genero}</p>
    </div>

</div>
    `

        }


    });
}

document.addEventListener('DOMContentLoaded', async () => {
    const cards = document.querySelector('.cards');
    const peliculas = await getData(URL);
    printCards(peliculas, cards);

})

//evento submit buscar  paso 1 
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const valor = search.value;
    if (valor && valor !== "") {
        dataNombre(valor)
        search.value = ""

    } else {
        window.location.reload();
    }
})
h1.addEventListener('click', () => {
    getData(URL);
})
