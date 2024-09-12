// src/pages/PokemonDetailPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { catchPokemon } from '../pokemonSlice';
import { Link } from 'react-router-dom';

function PokemonDetailPage() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);    
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchPokemonDetail() {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            setPokemon(response.data);
            setLoading(false); 
        } catch (err) {
            setError('Error fetching Pokemon details');
            setLoading(false);
        }
    }
    fetchPokemonDetail();
  }, [id]);

  const handleCatchPokemon = () => {
        const pokemonId = pokemon.id;
        const newName = pokemon.name;
        const response = dispatch(catchPokemon({ pokemonId, newName }));

        console.log(response.er);
        //set error and loading to true if dispatch is not successful
        if (response.error) {
            setError(response.error.message);
            setLoading(true);
        }

        //set error and loading to false if dispatch is successful
        setError(null);
        setLoading(false);
  };

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
        <Link to="/">Back</Link>
        <br />
        <Link to="/my-pokemon">My Pokemon List</Link>
        <br />

        {/* error message */}

        <h1>{pokemon.name}</h1>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <h2>Types</h2>
        <ul>
            {pokemon.types.map((typeInfo, index) => (
            <li key={index}>{typeInfo.type.name}</li>
            ))}
        </ul>
        <h2>Moves</h2>
        <ul>
            {pokemon.moves.slice(0, 5).map((moveInfo, index) => (
            <li key={index}>{moveInfo.move.name}</li>
            ))}
        </ul>
        <button onClick={handleCatchPokemon}>Catch Pokemon</button>
    </div>
  );
}

export default PokemonDetailPage;
