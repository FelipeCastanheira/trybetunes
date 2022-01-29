import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import style from './Search.module.css';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      singerName: '',
      artist: '',
      isButtonDisabled: true,
      results: [],
      showError: false,
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

  handleClick = async () => {
    const { singerName } = this.state;
    this.setState({ isLoading: true });
    const data = await searchAlbumsAPI(singerName);
    const errorAlbum = data.length === 0 && !data;
    this.setState({
      singerName: '',
      showError: errorAlbum,
      artist: singerName,
      results: data,
      isLoading: false,
    });
  }

  render() {
    const {
      singerName,
      isButtonDisabled,
      artist,
      results,
      showError,
      isLoading,
    } = this.state;
    return (
      <div className={ style.search } data-testid="page-search">
        <Header nav="search" />
        <section>
          { isLoading && <Loading /> }
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
              onClick={ this.handleClick }
            >
              Procurar
            </button>
          </form>
          <div className={ style.results }>
            <h4>{`Resultado de álbuns de: ${artist}`}</h4>
            {showError && <span>Nenhum álbum foi encontrado</span>}
            <section>
              {results
                .map(({ artistName, collectionName, artworkUrl100, collectionId }) => (
                  <Link
                    key={ collectionId }
                    to={ `album/${collectionId}` }
                    data-testid={ `link-to-album-${collectionId}` }
                  >
                    <img src={ artworkUrl100 } alt={ collectionName } />
                    <h5>{ collectionName }</h5>
                    <h6>{ artistName }</h6>
                  </Link>
                ))}
            </section>
          </div>
        </section>
      </div>
    );
  }
}

export default Search;
