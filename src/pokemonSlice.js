import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import { Route, Router } from 'react-router-dom';

// Async actions
export const catchPokemon = createAsyncThunk('pokemon/catchPokemon', async ({ pokemonId, newName }) => {
    //request to catch pokemon
    const data = {
        pokemon_id: pokemonId,
        name: newName
    };

    const response = await axios.post('/api/v1/catch', data);

    return response.data;
});

export const fetchMyPokemonList = createAsyncThunk('pokemon/fetchMyPokemonList', async () => {
    const response = await axios.get('/api/v1/my-pokemon');
    console.log(response.data);
    return response.data;
});

export const releasePokemon = createAsyncThunk('pokemon/releasePokemon', async () => {
    const response = await axios.delete('/api/v1/release');
    return response.data;
});

export const renamePokemon = createAsyncThunk('pokemon/renamePokemon', async ({ pokemonId, newName }) => {
    const response = await axios.put('/api/v1/rename', { pokemonId, newName });
    console.log(response.data);
    return response.data;
});

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState: {
        myPokemonList: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
    builder
        .addCase(catchPokemon.pending, (state) => {
            state.loading = true;
        })
        .addCase(catchPokemon.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload.success) {
                const pokemon = state.myPokemonList.find(p => p.id === action.payload.pokemonId);
                if (pokemon) {
                    pokemon.nickname = action.payload.renamed;
                } else {
                    // Add caught Pokémon to the list
                    state.myPokemonList.push({
                        id: new Date().toISOString(), // Temporary ID
                        nickname: '', // Prompt for nickname
                        ...action.payload,
                    });
                }
            } else {
                state.error = action.payload.message;
            }
        })
        .addCase(catchPokemon.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(releasePokemon.fulfilled, (state, action) => {
            if (action.payload.success) {
                state.myPokemonList = state.myPokemonList.filter(pokemon => pokemon.id !== action.payload.pokemonId);
            }
        })
        .addCase(renamePokemon.fulfilled, (state, action) => {
            const pokemon = state.myPokemonList.find(p => p.id === action.payload.pokemonId);
            if (pokemon) {
                pokemon.nickname = action.payload.renamed;
            }
        })
        .addCase(fetchMyPokemonList.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchMyPokemonList.fulfilled, (state, action) => {
            state.loading = false;
            state.myPokemonList = action.payload; // Ensure this is an array
        })
        .addCase(fetchMyPokemonList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

export default pokemonSlice.reducer;
