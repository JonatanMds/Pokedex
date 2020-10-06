
// Arrow function que recebe um id como parametro
const getPokemonUrl = id =>  `https://pokeapi.co/api/v2/pokemon/${id}`


//Foi criado um array de 150 itens, sem passar nenhum argumento(usando o .fill()), então foi criado um novo array com os moldes do array criado anteriormente usando o .map(_, index)
const generatePokemonPromises = () => Array(150).fill().map((_, index)=>
    // O .then recebe uma função com o parametro response que retorna um response.json() tranformando a promise em json
    fetch(getPokemonUrl(index + 1)).then(response => response.json()))
        
        

    //Reduzindo o array(pokemonPromises) em uma string
const generateHTML = pokemons => pokemons.reduce((accumulator, pokemon)=>{
        const types = pokemon.types.map(typeInfo => typeInfo.type.name)
        
        //O accumulator concatena uma string a cada interação
        accumulator += `
            <li class="card${types[0]}">
                <img class="card-image" alt="${pokemon.name}"src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png"/>
                <h2>${pokemon.name}</h2>
                <p class="type">#${pokemon.id}</p>
                <p class="card-subtitle">Type ${types.join(' | ')}</p>
                <p>Peso ${pokemon.weight} kg</p>
            </li>`
            return accumulator
        }, '')

//Referenciando a ul vazia através do seu atributo (data-js="pokedex)"
const insertPokemonsPage = pokemons =>{
    const ul = document.querySelector('[data-js="pokedex"]')
    //A innerHTML recebe as lis(pokemons)
    ul.innerHTML = pokemons

}
const pokemonPromises = generatePokemonPromises()
Promise.all(pokemonPromises)
    .then(generateHTML)
    .then(insertPokemonsPage)

