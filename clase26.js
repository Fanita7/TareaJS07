const API_URL = "https://pokeapi.co/api/v2/";

const container = document.getElementsByClassName("container")[0];
const pokemonCard = document.getElementsByClassName("pokemon-card")[0];

const pokemonName = document.createElement("h3");
const pokemonId = document.createElement("p");
const pokemonImage = document.createElement("img");
const pokemonWeight = document.createElement("p");

const displayPokemon = (pokemon) => {
    pokemonName.innerHTML = `Name: ${pokemon.name}`;
    pokemonId.innerHTML = `ID: ${pokemon.id}`;
    pokemonImage.src = pokemon.sprites.front_shiny; 
    pokemonWeight.innerHTML = `Weight: ${pokemon.weight}`;
    
    
    pokemonCard.innerHTML = ''; 
    pokemonCard.append(pokemonName, pokemonId, pokemonImage, pokemonWeight);

    if (!container.contains(pokemonCard)) {
        container.appendChild(pokemonCard);
    }
};

const fetchPokemon = async (pokemon) => {
    try {
        const response = await fetch(`${API_URL}pokemon/${pokemon}`);
        const parsedResponse = await response.json();
        localStorage.setItem("pokemon", parsedResponse.id);
        return parsedResponse;
    } catch (err) {
        console.error(err);
    }
};


document.getElementById("get-btn")
    .addEventListener("click", async () => {
        const text = document.getElementById("poke-name").value.toLowerCase();
        const pokemon = await fetchPokemon(text);
        if (pokemon) {
            localStorage.setItem("pokemon", parseInt(pokemon.id)); 
            console.log(pokemon);
            displayPokemon(pokemon);
            if (!container.contains(pokemonCard)) {
                pokemonCard.append(pokemonName, pokemonId, pokemonImage, pokemonWeight);
                container.appendChild(pokemonCard);
            }
        }
    });


document.getElementById("prev-btn").addEventListener("click", async () => {
    const currentPokemonId = parseInt(localStorage.getItem("pokemon"), 10);
    if (!isNaN(currentPokemonId) && currentPokemonId > 1) {
        const newId = currentPokemonId - 1;
        const pokemon = await fetchPokemon(newId);
        if (pokemon) {
            localStorage.setItem("pokemon", parseInt(pokemon.id, 10)); // Store the ID
            console.log(pokemon.name);
            displayPokemon(pokemon);
            if (!container.contains(pokemonCard)) {
                pokemonCard.append(pokemonName, pokemonId, pokemonImage, pokemonWeight);
                container.appendChild(pokemonCard);
            }
        }
    }
});


document.getElementById("next-btn").addEventListener("click", async () => {
    const currentPokemonId = parseInt(localStorage.getItem("pokemon"), 10);
    if (!isNaN(currentPokemonId)) {
        const newId = currentPokemonId + 1;
        const pokemon = await fetchPokemon(newId);
        if (pokemon) {
            localStorage.setItem("pokemon", parseInt(pokemon.id, 10)); // Store the ID
            console.log(pokemon.name); // for debugging purposes only
            displayPokemon(pokemon);
            if (!container.contains(pokemonCard)) {
                pokemonCard.append(pokemonName, pokemonId, pokemonImage, pokemonWeight);
                container.appendChild(pokemonCard);
            }
        }
    }
});


window.addEventListener('DOMContentLoaded', async () => {
    const savedPokemonId = parseInt(localStorage.getItem('pokemon'), 10); // Retrieve the ID

   
    if (!isNaN(savedPokemonId)) {
        try {
            const pokemon = await fetchPokemon(savedPokemonId);

            if (pokemon) {
                displayPokemon(pokemon);

                
                if (!container.contains(pokemonCard)) {
                    container.appendChild(pokemonCard);
                }
            } else {
                console.error("Failed to load Pokémon data from API.");
            }
        } catch (error) {
            console.error("Error fetching Pokémon:", error);
        }
    } else {
        console.log("No valid Pokémon ID found in localStorage.");
    }
});


