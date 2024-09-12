import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PokemonListPage from './pages/PokemonListPage';
import PokemonDetailPage from './pages/PokemonDetailPage';
import MyPokemonListPage from './pages/MyPokemonListPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PokemonListPage />} />
        <Route path="/pokemon/:id" element={<PokemonDetailPage />} />
        <Route path="/my-pokemon" element={<MyPokemonListPage />} />
      </Routes>
    </Router>
  );
}

export default App;
