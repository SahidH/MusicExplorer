import React, { Component } from "react";
import "./App.scss";
import SearchArtist from "./SearchArtist";
import AlbumCarousel from "./AlbumCarousel";
import AlbumDetail from "./AlbumDetail";
import DeezerStore from "./DeezerStore";
class App extends Component {
  constructor() {
    super();
    this.onSearchArtist = this.onSearchArtist.bind(this);
    this.onArtistSelected = this.onArtistSelected.bind(this);
    this.onAlbumSelected = this.onAlbumSelected.bind(this);
    this.hasChanged = this.hasChanged.bind(this);
    this.hasError = this.hasError.bind(this);
    this.DeezerConnection = DeezerStore({
      hasChanged: this.hasChanged,
      hasError: this.hasError
    });
    this.state = {
      store: null,
      error: null,
      selectedAlbum: null,
      selectedArtist: null,
      artists: []
    };
  }

  hasChanged({ store }) {
    this.setState({ store });
  }

  hasError({ error }) {
    this.setState({ error });
  }

  onSearchArtist(artist) {
    this.artist = artist;
    if (!artist) {
      this.setState({ artists: [] });
      return;
    }
    this.DeezerConnection.search({ connection: "artist", q: artist })
      .then(
        ({ result, q }) =>
          //only pick the request of the current artist
          q === this.artist && this.setState({ artists: result })
      )
      .catch(error => console.error("error", error));
  }

  onArtistSelected(artist) {
    //once clicked on an artist empty the results to make the dropdown disappear
    this.setState({ selectedArtist: artist, artists: [] });
  }

  onAlbumSelected(album) {
    this.setState({ selectedAlbum: album });
  }

  render() {
    return (
      <div className="app">
        <div className="app-container">
          <SearchArtist
            artists={this.state.artists}
            onSearchArtist={this.onSearchArtist}
            onArtistSelected={this.onArtistSelected}
          />

          {this.state.selectedArtist && (
            <div className="search-results">
              <p className="search-results__title">
                Search results for "{this.state.selectedArtist.name}"
              </p>
              <div className="search-results__albums">
                <p className="search-results__albums__title">Albums</p>
                <AlbumCarousel
                  albums={this.state.selectedArtist.albums}
                  selectedAlbum={this.state.selectedAlbum}
                  onAlbumSelected={this.onAlbumSelected}
                />
              </div>
              {this.state.selectedAlbum && (
                <AlbumDetail album={this.state.selectedAlbum} />
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
