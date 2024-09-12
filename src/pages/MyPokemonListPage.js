import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { renamePokemon, releasePokemon, fetchMyPokemonList } from '../pokemonSlice';

function MyPokemonListPage() {
    const dispatch = useDispatch();
    const { myPokemonList = [], loading, error } = useSelector((state) => state.pokemon); 

    const handleRename = (pokemonId, newName) => {
      dispatch(renamePokemon({ pokemonId, newName }));
    };

    const handleRelease = (pokemonId) => {
      dispatch(releasePokemon({ pokemonId }));
    };

    useEffect(() => {
      console.log('Fetching myPokemonList...');
      dispatch(fetchMyPokemonList());
    }, [dispatch]);
  
    useEffect(() => {
      console.log('Updated myPokemonList:', myPokemonList);
    }, [myPokemonList]);

    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error}</div>;
    }

    return (
      <div>
        <h1>My Pokemon List</h1>
        <ul>
          {myPokemonList.data.map((pokemon, index) => (
            <li key={index}>
              {pokemon.name || `Pokemon #${pokemon.pokemon_id}`}
              <button onClick={() => handleRename(pokemon.pokemon_id, pokemon.name)}>Rename</button>
              <button onClick={() => handleRelease(pokemon.pokemon_id)}>Release</button>
            </li>
          ))}
        </ul>
    </div>
    );
}

export default MyPokemonListPage;
