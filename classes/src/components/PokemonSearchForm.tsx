import React, { Component, ChangeEvent } from 'react';
import axios from 'axios';
import PokemonResults from './PokemonResults';
import Loader from './Loader';

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonSearchFormProps {}

interface PokemonSearchFormState {
  searchTerm: string;
  loading: boolean;
  error: string | null;
  pokemonResults: Pokemon[];
}

class PokemonSearchForm extends Component<PokemonSearchFormProps, PokemonSearchFormState> {
  constructor(props: PokemonSearchFormProps) {
    super(props);
    this.state = {
      searchTerm: '',
      loading: false,
      error: null,
      pokemonResults: [],
    };
  }

  componentDidMount() {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    if (savedSearchTerm) {
      this.setState({ searchTerm: savedSearchTerm });
      this.fetchPokemon(savedSearchTerm.toLowerCase());
    } else {
      this.fetchAllPokemon();
    }
  }

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: e.target.value.trim() });
  };

  handleSearch = () => {
    const { searchTerm } = this.state;
    if (searchTerm === '') {
      this.fetchAllPokemon();
    } else {
      this.fetchPokemon(searchTerm.toLowerCase());
    }
  };

  fetchAllPokemon = () => {
    this.setState({ loading: true, error: null });
    axios
      .get<{ results: Pokemon[] }>(`https://pokeapi.co/api/v2/pokemon`)
      .then((response) => {
        this.setState({ pokemonResults: response.data.results, loading: false });
      })
      .catch((error) => {
        console.error('Error fetching all Pokemon:', error);
        this.setState({ loading: false, error: 'Failed to fetch all Pokemon' });
      });
  };

  fetchPokemon = (pokemonName: string) => {
    this.setState({ loading: true, error: null });
    axios
      .get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((response) => {
        localStorage.setItem('searchTerm', pokemonName);
        this.setState({ pokemonResults: [response.data], loading: false });
      })
      .catch((error) => {
        console.error(`Error fetching Pokemon "${pokemonName}":`, error);
        this.setState({ loading: false, error: `Failed to fetch Pokemon "${pokemonName}"` });
      });
  };

  render() {
    const { searchTerm, loading, error, pokemonResults } = this.state;

    return (
      <div className="pokemon-search-form">
        <div className="search-section">
          <input type="text" placeholder="Enter Pokemon name" value={searchTerm} onChange={this.handleInputChange} />
          <button onClick={this.handleSearch}>Search</button>
        </div>

        {loading && <Loader />}
        {error && <p>{error}</p>}

        <div className="results-section">
          <PokemonResults results={pokemonResults} />
        </div>
      </div>
    );
  }
}

export default PokemonSearchForm;
