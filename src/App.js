import React, { Component } from "react";
import "./App.scss";
import SearchArtist from "./SearchArtist";
import AlbumCarousel from "./AlbumCarousel";
import AlbumDetail from "./AlbumDetail";
class App extends Component {
  constructor() {
    super();
    this.loop = this.loop.bind(this);
    this.myDeezerConnection = DeezerConnection(this.loop);
    this.onSearchArtist = this.onSearchArtist.bind(this);
    this.onArtistSelected = this.onArtistSelected.bind(this);
    this.onAlbumSelected = this.onAlbumSelected.bind(this);
    this.state = {
      thick: false,
      artists: []
    };
  }
  loop() {
    this.setState({ thick: !this.state.thick });
  }

  onSearchArtist(e) {
    const {
      target: { value }
    } = e;
    this.myDeezerConnection
      .search({ connection: "artist", q: value })
      .then(artists => this.setState({ artists }))
      .catch(error => console.error("error", error));
  }

  onArtistSelected(artist) {
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
            <div className="artist-detail--container">
              <p className="title-2 artist-detail--name">
                Search results for "{this.state.selectedArtist.name}"
              </p>
              <div className="artist-detail--albums">
                <p className="title blue-font">Albums</p>
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

function DeezerConnection(hasChanged) {
  const store = {};
  function generateKey({ type, id }) {
    return `${type}:${id}`;
  }

  function generateModel(data) {
    const { id, type } = data;
    store[generateKey({ id, type })] = new Proxy(data, {
      get: (obj, prop) => {
        if (obj[prop]) {
          return obj[prop];
        }
        if (!obj[prop] || !obj[prop].loading) {
          fetch(`/${obj.type}/${obj.id}/${prop}/`)
            .then(response => response.json())
            .then(({ data, total }) => {
              obj[prop] = data.map(generateModel);
              setTimeout(() => hasChanged(store));
              return obj[prop];
            })
            .catch(error => {
              obj[prop].loading = false;
              obj[prop].error = error;
              setTimeout(() => hasChanged(store));
            });
        }
        const some = [];
        some.loading = true;
        obj[prop] = some;
        return obj[prop];
      }
    });
    return store[generateKey({ id, type })];
  }

  const search = ({ connection, q }) =>
    fetch(`/search/${connection}/?q=${q}`)
      .then(response => response.json())
      .then(response => {
        const { data, total, next } = response;
        return data.map(generateModel);
      });

  return {
    search,
    store
  };
}
export default App;
