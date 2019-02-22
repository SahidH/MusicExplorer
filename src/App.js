import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Grommet, Box, Text, Drop, TextInput, Image } from "grommet";
const theme = {
  global: {
    font: {
      family: "Roboto",
      size: "14px",
      height: "20px"
    }
  }
};
class App extends Component {
  constructor() {
    super();
    this.loop = this.loop.bind(this);
    this.myDeezerConnection = DeezerConnection(this.loop);
    this.onSearchArtist = this.onSearchArtist.bind(this);
    this.onArtistSelected = this.onArtistSelected.bind(this);
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
    console.log("artist", artist);
    this.setState({ selectedArtist: artist, artists: [] });
  }

  render() {
    return (
      <Grommet theme={theme}>
        <Box fill={true} flex="grow" pad="medium">
          <SearchArtist
            artists={this.state.artists}
            onSearchArtist={this.onSearchArtist}
            onArtistSelected={this.onArtistSelected}
          />

          {this.state.selectedArtist && (
            <Box pad={{ top: "small" }}>
              <Text>{this.state.selectedArtist.name.value}</Text>
              {this.state.selectedArtist.albums.loading && (
                <div class="spinner">
                  <div class="cube1" />
                  <div class="cube2" />
                </div>
              )}
              <Box direction="row" wrap={true} pad={{ top: "small" }}>
                {!this.state.selectedArtist.albums.loading &&
                  this.state.selectedArtist.albums.value.map(album => (
                    <Box style={{ width: "200px" }}>
                      <Box height="small" width="small">
                        <Image fit="cover" src={album.cover_big.value} />
                      </Box>
                      <Text truncate={true}>{album.title.value}</Text>
                    </Box>
                  ))}
              </Box>
            </Box>
          )}
        </Box>
      </Grommet>
    );
  }
}
// const SearchArtist = ({ value, options, onSearchArtist, onArtistSelected }) => (
//   <Select
//     value={<TextInput value={value} onChange={onSearchArtist} />}
//     options={options}
//     onChange={onArtistSelected}
//   />
// );

class SearchArtist extends Component {
  constructor(props) {
    super(props);
    this.targetRef = React.createRef();
  }

  render() {
    const { artists, onSearchArtist, onArtistSelected } = this.props;
    return (
      <Box align="center" justify="center">
        <TextInput
          placeholder="Search here"
          ref={this.targetRef}
          onChange={onSearchArtist}
        />
        {this.targetRef.current && (
          <Drop
            align={{ top: "bottom", left: "left" }}
            target={this.targetRef.current}
          >
            {artists.map(artist => (
              <Box pad="small" style={{ cursor: "pointer" }}>
                <Text size="small" onClick={() => onArtistSelected(artist)}>
                  {artist.name.value}
                </Text>
              </Box>
            ))}
          </Drop>
        )}
      </Box>
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
          if (obj[prop] && obj[prop].loading) {
            return {
              loading: true,
              value: []
            };
          }
          return {
            value: obj[prop]
          };
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
              obj[prop] = {
                error
              };
              setTimeout(() => hasChanged(store));
            });
        }
        obj[prop] = {
          loading: true
        };
        return { loading: true, value: [] };
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
