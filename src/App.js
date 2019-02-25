import React, { Component } from "react";
import "./App.scss";
import SearchArtist from "./SearchArtist";
import AlbumCarousel from "./AlbumCarousel";
import AlbumDetail from "./AlbumDetail";
import DeezerStore from "./DeezerStore";
import { selectArtist, selectAlbum, queryArtist } from "./actions";
import { connect } from "react-redux";

class App extends Component {
  constructor() {
    super();
    this.onSearchArtist = this.onSearchArtist.bind(this);
    this.onArtistSelected = this.onArtistSelected.bind(this);
    this.onAlbumSelected = this.onAlbumSelected.bind(this);
  }

  onSearchArtist(e) {
    const {
      target: { value }
    } = e;
    this.props.dispatch(queryArtist({ searchArtist: value }));
  }

  onArtistSelected(artist) {
    this.props.dispatch(selectArtist({ artist }));
  }

  onAlbumSelected(album) {
    this.props.dispatch(selectAlbum({ album }));
  }

  render() {
    const {
      selected: { album: selectedAlbum, artist: selectedArtist },
      artistStore,
      albumStore,
      trackStore
    } = this.props;
    return (
      <div className="app">
        <div className="app-container">
          <SearchArtist
            artists={artistStore.artists}
            loading={artistStore.loading}
            onSearchArtist={this.onSearchArtist}
            onArtistSelected={this.onArtistSelected}
          />

          {selectedArtist && (
            <div className="search-results">
              <p className="search-results__title">
                Search results for "{selectedArtist.name}"
              </p>
              <div className="search-results__albums">
                <p className="search-results__albums__title">Albums</p>
                <AlbumCarousel
                  albums={albumStore.albums}
                  loading={albumStore.loading}
                  selectedAlbum={selectedAlbum}
                  onAlbumSelected={this.onAlbumSelected}
                />
              </div>
              {selectedAlbum && (
                <AlbumDetail
                  album={selectedAlbum}
                  tracks={trackStore.tracks}
                  loading={trackStore.loading}
                />
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { trackStore, albumStore, artistStore, selected } = state;

  return {
    artistStore,
    trackStore,
    albumStore,
    selected
  };
};

export default connect(mapStateToProps)(App);
