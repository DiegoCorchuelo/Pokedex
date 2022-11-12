/*Traer los elementos de HTML*/ 
const pokeCard = document.querySelector('[data-poke-card]');
const pokeName = document.querySelector('[data-poke-name]');
const pokeImg = document.querySelector('[data-poke-img]');
const pokeImgContainer = document.querySelector('[data-poke-img-container]');
const pokeId = document.querySelector('[data-poke-id]');
const pokeTypes= document.querySelector('[data-poke-types]');
const pokeStats = document.querySelector('[data-poke-stats]');

/*Objeto de colores para cada tipo de pokemon*/
const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};

const searchPokemon = event => { /* Función flecha que recibe un parametro (event) */
    event.preventDefault();     /* Cuando usamos submit se envia el form y con prevenDefault evitamos esto, Cancelamos el submit del form */
    const {value} = event.target.pokemon; /* Obtenemos el valor del input */
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`) /* Alt GR + } */  /*Buscamos en la API el nombre del pokemon*/
        .then(data => data.json())
        .then(response => renderPokemonData(response))
        .catch(err => renderNotFound())
};


/*Renderiza todo en la page*/ 
const renderPokemonData = data => {
    const sprite = data.sprites.front_default; /*Tomamos la Image del pokemon */
    const {stats, types} = data; /*Tomamos las stats y types del pokemon */

    pokeName.textContent = data.name; /*Al pokeName le colocamos el name que viene en la data*/
    pokeImg.setAttribute('src', sprite); /* Colocamos el sprite(img) del data en el source(src)*/
    pokeId.textContent = `Nº ${data.id}`; /*Colocamos el ID que buscamos en data*/
    setCardColor(types);
    renderPokemonTypes(types);
    renderPokemonStats(stats);
}

/*Darle color de fondo al pokemon*/
const setCardColor = types => {
    colorOne = typeColors[types[0].type.name]; /*Colocamos color al primer array o tipo de pokemon*/
    colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default; /*Verificamos si tiene un segundo tipo de especie y le colocamos el color, si no tiene le colocamos el color default */
    pokeImg.style.background = `radial-gradient(${colorTwo} 33%, ${colorOne} 33%`;
    pokeImg.style.backgroundSize = '5px 5px';
}

/*Darle color al texto de tipo de pokemon*/ 
const renderPokemonTypes = types => {
    pokeTypes.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement('div');
        typeTextElement.style.color = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
}

/*stats*/

const renderPokemonStats = stats => {
    pokeStats.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement('div');
        const statElementName = document.createElement('div');
        const statElementAmount = document.createElement('div');
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    });

}

const renderNotFound = () => {
    pokeName.textContent = 'No encontrado';
    pokeImg.setAttribute('src', './Images/poke-shadow.png');
    pokeImg.style.background = '#FFF';
    pokeTypes.innerHTML = '';
    pokeStats.innerHTML = '';
    pokeId.textContent = '';
}