// 1. Diccionario de traducción de tipos
const tiposEspanol = {
    normal: 'Normal',
    fighting: 'Lucha',
    flying: 'Volador',
    poison: 'Veneno',
    ground: 'Tierra',
    rock: 'Roca',
    bug: 'Bicho',
    ghost: 'Fantasma',
    steel: 'Acero',
    fire: 'Fuego',
    water: 'Agua',
    grass: 'Planta',
    electric: 'Eléctrico',
    psychic: 'Psíquico',
    ice: 'Hielo',
    dragon: 'Dragón',
    dark: 'Siniestro',
    fairy: 'Hada'
};

let nextUrl = 'https://pokeapi.co/api/v2/pokemon?limit=20';
const container = document.getElementById('characters-list');

async function fetchCharacters() {
    if (!nextUrl) return;

   
    const btnLoad = document.getElementById('load-more');
    if (btnLoad) {
        btnLoad.disabled = true;
        btnLoad.innerText = 'Buscando Pokémon...chambranito';
    }

    try {
        const response = await fetch(nextUrl);
        const data = await response.json();
        nextUrl = data.next;

        const pokemonList = data.results;

        for (const pokemonShort of pokemonList) {
            const detailRes = await fetch(pokemonShort.url);
            const pokemon = await detailRes.json();

            const card = document.createElement('div');
            card.className = 'character-card';

            const imageShiny = pokemon.sprites.other['official-artwork'].front_shiny;

           
            const tiposTraducidos = pokemon.types.map(t => {
                const nombreIngles = t.type.name;
                return tiposEspanol[nombreIngles] || nombreIngles;
            }).join(' / ');

            card.innerHTML = `
                <div class="char-img-container">
                    <img src="${imageShiny}" alt="${pokemon.name}" class="char-img">
                </div>
                <div class="char-info">
                    <h2 style="text-transform: capitalize;">${pokemon.name} ✨</h2>
                    <span class="subtitle">${tiposTraducidos}</span>
                    <div class="stats">
                        <div class="stat-item">
                            <strong>Altura:</strong> <span>${pokemon.height / 10} m</span>
                        </div>
                        <div class="stat-item">
                            <strong>Peso:</strong> <span>${pokemon.weight / 10} kg</span>
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(card); 
        }

        if (btnLoad) {
            btnLoad.disabled = false;
            btnLoad.innerText = 'MÁS POKEMONES';
        }

    } catch (error) {
        console.error('Error:', error);
        if (btnLoad) {
            btnLoad.innerText = 'Error al cargar ❌';
            btnLoad.disabled = false;
        }
    }
}


fetchCharacters();
