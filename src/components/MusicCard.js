import React from 'react';
import propTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      isFavorite: false,
      isLoading: false,
    };
    this.addFavorite = this.addFavorite.bind(this);
  }

  componentDidMount() {
    this.addFavorite();
  }

  handleCheck = async () => {
    const { trackObject } = this.props;
    const { isFavorite } = this.state;
    this.setState({
      isLoading: true,
      isFavorite: !isFavorite,
    });
    if (!isFavorite) {
      await addSong(trackObject);
      this.setState({ isLoading: false });
    }
  }

  addFavorite() {
    const { favoriteIds, trackId } = this.props;
    const isItFavotite = favoriteIds.some((id) => id === trackId);
    this.setState({ isFavorite: isItFavotite });
  }

  render() {
    const { previewUrl, trackName, trackId } = this.props;
    const { isFavorite, isLoading } = this.state;
    return (
      <div>
        <h5>{trackName}</h5>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label htmlFor={ `checkbox-music-${trackId}` }>
          Favorita
          <input
            type="checkbox"
            checked={ isFavorite }
            onChange={ this.handleCheck }
            data-testid={ `checkbox-music-${trackId}` }
          />
        </label>
        {isLoading && <Loading />}
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: propTypes.string,
  trackName: propTypes.string,
  trackId: propTypes.string,
  favoriteIds: propTypes.arrayOf(propTypes.string),
}.isRequired;

export default MusicCard;
