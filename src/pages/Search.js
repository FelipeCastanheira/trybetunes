import React from 'react';
import Header from '../components/Header';
import style from './Search.module.css';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      singerName: '',
      isButtonDisabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    this.setState({ singerName: target.value }, () => {
      const MIN_LENGTH = 2;
      const { singerName } = this.state;
      const invalidName = singerName.length < MIN_LENGTH;
      this.setState({ isButtonDisabled: invalidName });
    });
  }

  render() {
    const {
      singerName,
      isButtonDisabled,
    } = this.state;
    return (
      <div className={ style.search } data-testid="page-search">
        <Header nav="search" />
        <section>
          <form>
            <div className={ style.inputContainer }>
              <input
                type="text"
                value={ singerName }
                name="singerName"
                placeholder="Nome do Artista"
                onChange={ this.handleChange }
                data-testid="search-artist-input"
              />
              <h3>🔍</h3>
            </div>
            <button
              disabled={ isButtonDisabled }
              data-testid="search-artist-button"
              type="button"
            >
              Procurar
            </button>
          </form>
          <div className={ style.results }>Resultado de álbuns de Artista X:</div>
        </section>
      </div>
    );
  }
}

export default Search;
