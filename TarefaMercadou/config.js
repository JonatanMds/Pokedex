
// Function que busca as informações dos pokémons. ${id} é o ID do pokémon, no qual receberei os dados.
const getPokemonUrl = id =>  `https://pokeapi.co/api/v2/pokemon/${id}`


//Foi criado um array de 150 itens, sem passar nenhum argumento(usando o .fill()), então foi criado um novo array com os moldes do array criado anteriormente usando o .map(_, index)
const generatePokemonPromises = () => Array(150).fill().map((_, index)=>
    fetch(getPokemonUrl(index + 1)).then(response => response.json()))
        
        // reduzi o array a uma string com o pokémons.reduce()
const generateHTML = pokemons => pokemons.reduce((accumulator, pokemon)=>{
    //pokemon.type resulta em um array de objetos, foi transformado o array em uma string com .map()
    //Através do .map() ele me retorna o tipo do pokemon( ex: electric | water)    
    const types = pokemon.types.map(typeInfo => typeInfo.type.name)
        
        //O accumulator concatena uma string a cada interação
        accumulator += `
            <li class="card ${types[0]}">
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
    //A ul recebe as lis(pokemons)
    ul.innerHTML = pokemons

}
const pokemonPromises = generatePokemonPromises()
// recebe um array de todas as promises 
Promise.all(pokemonPromises)
    .then(generateHTML)
    .then(insertPokemonsPage)

//filtro dos pokemons

//De início "TODOS" estão ativos, ao clicar em uma das lis ela toma o dominio do active e tira o active das outras lis. 
$(document).ready(function(){
    $(".filter .card").click(function(){
        $(this).addClass("active").siblings().removeClass("active")

        //fadeOut() faz os elementos visíveis desaparecerem
        $(".pokedex").fadeOut()
        setTimeout(function(){
            //fadeIn() faz os elementos invisíveis aparecerem
            $(".pokedex").fadeIn()
        },700)

        
        let value = $(this).attr("data-filter")

        setTimeout(function(){
            //exibe todos os elementos
            if(value === "todos"){
                $(".pokedex .card").show("500")
            }else{
                //esconde os não selecionados
                $(".pokedex .card").not("."+value).hide("500")
                //faz os objetos selecionados aparecerem
                $(".pokedex .card").filter("."+value).show("500")
            }
        }, 350)

    })
})
