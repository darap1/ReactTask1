import React, { Component } from 'react';
import './App.css';
import PokemonSearchForm from './components/PokemonSearchForm';
import PokemonInfo from './components/PokemonInfo';
import ErrorBoundary from './ErrorBoundary';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ErrorBoundary>
          <h1>Pokemon Search</h1>
          <div className="top-section">
            <PokemonSearchForm />
          </div>
          <div className="bottom-section">
            <PokemonInfo />
          </div>
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
