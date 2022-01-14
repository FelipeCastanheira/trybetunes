import React from 'react';
import propTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      isFavorite: false,
      isLoading: false,
      exhibition: true,
    };
    this.addFavorite = this.addFavorite.bind(this);
  }

  componentDidMount() {
    this.addFavorite();
  }

  handleCheck = async () => {
    const { trackObject, showCard } = this.props;
    const { isFavorite } = this.state;
    const isFavoriteMusic = !isFavorite;
    const shouldRender = isFavoriteMusic || showCard;
    this.setState({
      isLoading: true,
      isFavorite: isFavoriteMusic,
      exhibition: shouldRender,
    });
    if (!isFavorite) {
      await addSong(trackObject);
    } else {
      await removeSong(trackObject);
    }
    this.setState({ isLoading: false });
  }

  addFavorite() {
    const { favoriteIds, trackId } = this.props;
    const isItFavorite = favoriteIds.some((id) => id === trackId);
    this.setState({ isFavorite: isItFavorite });
  }

  render() {
    const { previewUrl, trackName, trackId } = this.props;
    const { isFavorite, isLoading, exhibition } = this.state;
    return (
      <div>
        {exhibition
            && (
              <>
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
                    id={ `checkbox-music-${trackId}` }
                    checked={ isFavorite }
                    onChange={ this.handleCheck }
                    data-testid={ `checkbox-music-${trackId}` }
                  />
                </label>
              </>)}
        {isLoading && <Loading />}
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: propTypes.string.isRequired,
  trackName: propTypes.string.isRequired,
  trackId: propTypes.number.isRequired,
  favoriteIds: propTypes.arrayOf(propTypes.number).isRequired,
  trackObject: propTypes.objectOf(propTypes.string).isRequired,
  showCard: propTypes.bool.isRequired,
};

export default MusicCard;
