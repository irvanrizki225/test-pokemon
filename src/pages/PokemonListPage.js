import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function PokemonListPage() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    async function fetchPokemons() {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=10');
      setPokemons(response.data.results);
    }
    fetchPokemons();
  }, []);

  return (
    <div>
      <h1>Pokemon List</h1>
      <Link to="/my-pokemon">Go to My Pokemon List</Link>
      <ul>
        {pokemons.map((pokemon, index) => (
          <li key={index}>
            <Link to={`/pokemon/${index + 1}`}>{pokemon.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PokemonListPage;
