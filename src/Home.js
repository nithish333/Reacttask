import React, { useState, useEffect } from "react";
import "./Home.css";
const PokemonTable = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/generation/1/")
      .then((response) => response.json())
      .then((data) => {
        const pokemonData = data.pokemon_species.map((p) => {
          return fetch(p.url)
            .then((res) => res.json())
            .then((d) => {
              return {
                name: p.name,
                color: d.color.name,
              };
            });
        });

        Promise.all(pokemonData).then((pokemonDataArray) => {
          setPokemonList(pokemonDataArray);
          setFilteredPokemon(pokemonDataArray);
        });
      });
  }, []);

  const colors = ["red", "blue", "yellow", "green", "black", "brown"];

  const handleColorChange = (e) => {
    if (e.target.value) {
      const filtered = pokemonList.filter(
        (pokemon) => pokemon.color == e.target.value
      );
      setFilteredPokemon(filtered);
    } else {
      setFilteredPokemon(pokemonList);
    }
  };

  return (
    <div className="mainPage">
      <select onChange={handleColorChange}>
        <option value="">All Colors</option>
        {colors.map((color) => (
          <option key={color} value={color}>
            {color}
          </option>
        ))}
      </select>
      <table className="pTable">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {filteredPokemon.map((pokemon, index) => (
            <tr key={pokemon.name}>
              <td>{index + 1}</td>
              <td>{pokemon.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PokemonTable;
