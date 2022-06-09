import './App.css';
import { useState } from 'react';
import Axios from 'axios';

function App() {
const [pokemonName,SetPokemonName] = useState("");
const [pokemonChosen,SetPokemonChosen] = useState(false);
const [pokemon,SetPokemon] = useState({
      name: "",
      species: "",
      img : "",
      hp : "",
      attack : "",
      defence : "",
      type : "",
});

const searchPokemon = () => {
Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(
  (response) => {
    SetPokemon({
      name: pokemonName,
      species: response.data.species.name,
      img : response.data.sprites.front_default,
      hp : response.data.stats[0].base_stat,
      attack : response.data.stats[1].base_stat,
      defence : response.data.stats[2].base_stat,
      type : response.data.types[0].type.name,
    });
    SetPokemonChosen(true);
  })
}

  return (
    <div className="App">
      <div className="TitleSection">
      <h1>Pokemon Stats</h1>
      <input type="text" 
      onChange={(event) => { 
        SetPokemonName(event.target.value)}} />
      <button onClick={searchPokemon}>Search Pokemon</button>
      </div>
      <div className="DisplaySection">
        {!pokemonChosen ? (
          <h1>Please choose a pokemon</h1>
        ):(
          <>
          <h1>{pokemon.name}</h1>
          <img src= {pokemon.img} />
          <h3>Species : {pokemon.species}</h3>
          <h3>Type : {pokemon.type}</h3>
          <h4>Hp : {pokemon.hp}</h4>
          <h4>Attack : {pokemon.attack}</h4>
          <h4>Defence : {pokemon.defence}</h4>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
