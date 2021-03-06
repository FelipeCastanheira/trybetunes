import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import style from './Album.module.css';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musicList: [],
      albumImg: '',
      albumName: '',
      artistName: '',
      favoriteIds: '',
    };
  }

  componentDidMount() {
    this.getSongs();
  }

  getSongs = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const data = await getMusics(id);
    const artistData = data.find(({ kind }) => kind !== 'song');
    const { artistName, artworkUrl100, collectionName } = artistData;
    const songs = data.filter(({ kind }) => kind === 'song');
    const favorites = await getFavoriteSongs();
    const favoriteIds = favorites.map(({ trackId }) => trackId);
    this.setState({
      musicList: songs,
      albumImg: artworkUrl100,
      albumName: collectionName,
      artistName,
      favoriteIds,
    });
  }

  render() {
    const { musicList, albumImg, albumName, artistName, favoriteIds } = this.state;
    return (
      <div data-testid="page-album" className={ style.album }>
        <Header nav="Album" />
        <main>
          <aside>
            <img src={ albumImg } alt={ albumName } />
            <h3 data-testid="album-name">{ albumName }</h3>
            <h5 data-testid="artist-name">{ artistName }</h5>
          </aside>
          <section>
            {musicList.map((trackObject) => (
              <MusicCard
                key={ trackObject.trackId }
                previewUrl={ trackObject.previewUrl }
                trackName={ trackObject.trackName }
                trackId={ trackObject.trackId }
                trackObject={ trackObject }
                favoriteIds={ favoriteIds }
                showCard
              />))}
          </section>
        </main>
      </div>
    );
  }
}

Album.propTypes = {
  match: propTypes.shape({
    params: propTypes.objectOf(propTypes.number),
  }),
}.isRequired;

export default Album;
