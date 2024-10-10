// Javascript for Mod10-Mini-Project Search and Details Page

document.getElementById("pokemon-search-form").reset()
document.getElementById("pokemon-searchID-form").reset()

async function fetchPokemonListData() {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0`);
    const pokemonListData = await response.json();
    console.log(pokemonListData)
    return pokemonListData
};

// Note: The number of pokemon return can be truncated from the full list (currently at 1302) to any desired list lenght (such as 20 pokemon)
// Change the length of the list returned by changing the limit in the api link. " limit= [LIST-LENGTH] " ex: `https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`

function collapseList() {
    document.getElementById("pokemon-list").innerHTML = "" // could replace blank text area with button instead of having button be above the div="pokemon-list"`<button id="pokemon-list-button"type="submit">Get Pokemon List</button>`

}

function resetItems() {
    document.getElementById("pokemon-search-return").innerHTML = ""
    document.getElementById("pokemon-list").innerHTML = ""
    document.getElementById("pokemon-search-form").reset()
    document.getElementById("pokemon-searchID-form").reset()
}

// document.addEventListener('DOMContentLoaded', 
// Future idea: display this list as a table with header cols as 'id' 'name' 'type'
// Future idea: have user input range of pokemon id's they would like to see and filter table/list based on input
document.getElementById("pokemon-list-button").onclick=async() => { 
    const pokemonList = await fetchPokemonListData();
    const pokemonListElement = document.getElementById('pokemon-list');
    //nameArray = pokemonList.results.map(pokemon => pokemon.name)
    // console.log(nameArray)
    // idArray = nameArray.map(name => 
    // fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    // .then(response => response.json())
    // .then(pokemonData => {
    //     console.log(pokemonData.id)}));
    pokemonListElement.innerHTML =
        `<div class="m-3 bg-warning p-3 rounded-3">
            <h3>Pokemon List:</h3>
            <div id="collapse-list">
                <button id="collapse-list-button"onclick="collapseList()"type="submit"style="text-center"class="btn btn-primary m-2 p-1 px-4 rounded-3 text-white">Collapse List</button>
            </div>
            <div class="m-2">
                <ol>
                    ${pokemonList.results.map(pokemon => `<li>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} - ID: ${pokemon.url.substring(34,39).replace(/\D/g,'')}</li>`).join('')}
                </ol>
            </div>
            <div id="collapse-list">
                <button id="collapse-list-button"onclick="collapseList()"type="submit"class="btn btn-primary m-2 mb-3 p-1 px-4 rounded-3 text-white">Collapse List</button>
            </div>
        </div>`      
    
};

//function fetchPokemonAbilityData(url) {
// initial ability info: ${abilityData.effect_entries[0].effect} // console.log(pokemonData.abilities[0].ability.url) 

function fetchPokemonData(pokename) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokename}`)
    .then(response => response.json())
    .then(pokemonData => {
        console.log(pokemonData)
        
        const pokemonInfoElement = document.getElementById('pokemon-search-return');
        pokemonData.name = pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)
        pokemonType = pokemonData.types[0].type.name.charAt(0).toUpperCase() + pokemonData.types[0].type.name.slice(1)
        console.log(pokemonType)
        if (pokemonType == 'Fire' || pokemonType== 'Dragon') {
            bg = 'danger'
        }
        else if (pokemonType == 'Water' || pokemonType == 'Ice') {
            bg = 'primary'
        }
        else if (pokemonType == 'Grass' || pokemonType == 'Fairy' || pokemonType == 'Bug') {
            bg = 'success'
        } 
        else if (pokemonType == 'Flying' || pokemonType == 'Fighting' || pokemonType == 'Ground' || pokemonType == 'Rock' || pokemonType == 'Electric' || pokemonType == 'Normal') {
            bg = 'warning'
        } 
        else if (pokemonType == 'Dark' || pokemonType == 'Ghost' || pokemonType == 'Poison' || pokemonType == 'Psychic' || pokemonType == 'Steel') {
            bg = 'secondary'
        } else {
            bg = 'light'
        }
        pokemonInfoElement.innerHTML = `
        <div class="bg-${bg} rounded-3 p-3 m-3">
            <div class="row row-cols-1 row-cols-sm-2">
                <div>
                    <h2>${pokemonData.name}</h2>
                    <h3>ID: ${pokemonData.id}</h3>
                    <h4>Type: ${pokemonType}</h4>
                    <h4>Abilities:</h4>
                    <ol>
                        ${pokemonData.abilities.map(ability => `<li>${ability.ability.name}</li>`).join('')} 
                    </ol>
                    <h4>Stats:</h4>
                    <ol>
                        ${pokemonData.stats.map(stat => `<li>${stat.stat.name}: ${stat.base_stat} </li>`).join('')} 
                    </ol>
                    <h5>Height: ${pokemonData.height}</h5>

                    <h5>Weight: ${pokemonData.weight}</h5>

                    <h5>Base Experience: ${pokemonData.base_experience}</h5>
                </div>
                <div class="text-center">
                     <img src="${pokemonData.sprites.front_default}"alt="${pokemonData.name}"class="img-fluid bg-light m-1 p-2 rounded-3" width="300px">
                </div>
            </div>
            <div class="accordion" id="accordionBasic">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingTwo">
                    <button class="accordion-button collapsed bg-warning" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        Pokemon Moves
                    </button>
                    </h2>
                    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                        <div class="accordion-body bg-warning">
                            <ol>
                                ${pokemonData.moves.map(move => `<li>${move.move.name}</li>`).join('')}
                            </ol>                    
                        </div>
                    </div>
                </div>
            </div>
        </div>`
})};

document.getElementById("pokemon-search-form").addEventListener("submit", function(event) {
    event.preventDefault();
    let pokename = document.getElementById("pokemon-search").value.toLowerCase();
    console.log(`User input: Pokemon name: ${pokename}`);
    if (`https://pokeapi.co/api/v2/pokemon/${pokename}` == true){
        console.log("yes")
    } else {
        console.log('no')
    }
    document.getElementById("pokemon-searchID-form").reset()
    fetchPokemonData(pokename);
});


document.getElementById("pokemon-searchID-form").addEventListener("submit", function(event) {
    event.preventDefault();
    let pokeID = document.getElementById("pokemon-searchID").value;
    console.log(`User input: Pokemon ID: ${pokeID}`);
    match = false;
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0`)
    .then(response => response.json())
    .then(pokemonListData => {
        url = `https://pokeapi.co/api/v2/pokemon/${pokeID}/`
        console.log(pokemonListData)
        // pokemon.url.substring(34,39).replace(/\D/g,'')
        pokemonListData.results.forEach(result => {
            if (result.url === url) {
                console.log('match')
                match == true
                console.log(result.url)
                pokename = result.name
                document.getElementById("pokemon-search-form").reset()
                fetchPokemonData(pokename);
            }})});
    if (match == false) {
        document.getElementById("pokemon-searchID-form").reset()
        const pokemonInfoElement = document.getElementById('pokemon-search-return');
        pokemonInfoElement.innerHTML = `Input pokemon ID is not valid. Please try again.` }
            
    });

let a = Math.floor(Math.random() * 1302)
console.log(a)
let b = Math.floor(Math.random() * 1302)
console.log(b)
let c = Math.floor(Math.random() * 1302)
console.log(c)
let d = Math.floor(Math.random() * 1302)
console.log(d)
let e = Math.floor(Math.random() * 1302)
console.log(e)
let f = Math.floor(Math.random() * 1302)
console.log(f)

z = 'pokemon-img-1'
y = 'pokemon-img-2'
x = 'pokemon-img-3'
w = 'pokemon-img-4'
v = 'pokemon-img-5'
u = 'pokemon-img-6'

document.addEventListener( "DOMContentLoaded", randomImg(a, z));
document.addEventListener( "DOMContentLoaded", randomImg(b, y));
document.addEventListener( "DOMContentLoaded", randomImg(c, x));
document.addEventListener( "DOMContentLoaded", randomImg(d, w));
document.addEventListener( "DOMContentLoaded", randomImg(e, v));
document.addEventListener( "DOMContentLoaded", randomImg(f, u));
function randomImg(num, element) {
    let pokeID = num
    console.log(`Pokemon IMG ID: ${pokeID}`);
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0`)
    .then(response => response.json())
    .then(pokemonListData => {
        pokename = pokemonListData.results[pokeID].name
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokename}`)
        .then(response => response.json())
        .then(pokemonData => {
            console.log(pokemonData)
            pokemonData.name = pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)
            const pokemonImgElement = document.getElementById(`${element}`);
            pokemonImgElement.innerHTML = `
            <img src="${pokemonData.sprites.front_default}"alt="${pokemonData.name}"class="d-block w-100 img-fluid bg-light m-1 p-2">
            <figcaption class="m-1 bg-light rounded-3 text-center">Name: ${pokemonData.name} - ID: ${pokemonData.id}</figcaption>
            `
    })})}
