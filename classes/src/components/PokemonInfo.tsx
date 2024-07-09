import React, { Component } from 'react';
import axios from 'axios';

interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

interface PokemonSprites {
  front_default: string;
}

interface PokemonInfoState {
  pokemonData: {
    name: string;
    sprites: PokemonSprites;
    abilities: PokemonAbility[];
    base_experience: number;
  } | null;
}

class PokemonInfo extends Component<React.PropsWithChildren<unknown>, PokemonInfoState> {
  constructor(props: React.PropsWithChildren<unknown>) {
    super(props);
    this.state = {
      pokemonData: null,
    };
  }

  componentDidMount() {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    if (savedSearchTerm) {
      this.fetchPokemon(savedSearchTerm.toLowerCase());
    }
  }

  fetchPokemon = (pokemonName: string) => {
    axios
      .get<string>(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((response) => {
        console.log('Pokemon data:', response.data);
        this.setState({
          pokemonData: {
            name: response.data.name,
            sprites: response.data.sprites,
            abilities: response.data.abilities,
            base_experience: response.data.base_experience,
          },
        });
      })
      .catch((error) => {
        console.error(`Error fetching Pokemon "${pokemonName}":`, error);
      });
  };

  render() {
    const { pokemonData } = this.state;

    return (
      <div className="pokemon-info">
        <h2>Pokemon Info</h2>
        {pokemonData ? (
          <div>
            <h3>{pokemonData.name.toUpperCase()}</h3>
            <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
            <h4>Abilities:</h4>
            <ul>
              {pokemonData.abilities.map((ability, index) => (
                <li key={index}>{ability.ability.name}</li>
              ))}
            </ul>
            <p>Base Experience: {pokemonData.base_experience}</p>
          </div>
        ) : (
          <p>Search for a Pokemon.</p>
        )}
      </div>
    );
  }
}

export default PokemonInfo;
