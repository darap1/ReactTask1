import React, { Component } from 'react';

interface PokemonResult {
  name: string;
  url: string;
}

interface PokemonResultsProps {
  results: PokemonResult[];
}

class PokemonResults extends Component<PokemonResultsProps> {
  render() {
    const { results } = this.props;

    return (
      <div className="pokemon-results">
        <h2>Pokemons List</h2>
        <ul>
          {results.map((pokemon, index) => (
            <li key={index}>
              <strong>Name:</strong> {pokemon.name} | url: {pokemon.url}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default PokemonResults;
