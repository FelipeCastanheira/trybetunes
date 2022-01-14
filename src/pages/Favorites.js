import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favorites: [],
      favoriteIds: [],
    };
  }

  componentDidMount() {
    this.getSongs();
  }

  getSongs = async () => {
    const favorites = await getFavoriteSongs();
    const favoriteIds = favorites.map(({ trackId }) => trackId);
    this.setState({ favorites, favoriteIds });
  }

  render() {
    const { favoriteIds, favorites } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header nav="favorites" />
        <section>
          {favorites.map((trackObject) => (
            <MusicCard
              key={ trackObject.previewUrl }
              previewUrl={ trackObject.previewUrl }
              trackName={ trackObject.trackName }
              trackId={ trackObject.trackId }
              trackObject={ trackObject }
              favoriteIds={ favoriteIds }
              showCard={ false }
            />))}
        </section>
      </div>
    );
  }
}

export default Favorites;
