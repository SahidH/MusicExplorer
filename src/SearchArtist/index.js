import React, { Component } from "react";
import Loader from "../Loader";
import "./index.scss";

class SearchArtist extends Component {
  constructor(props) {
    super(props);
    this.userTyping = this.userTyping.bind(this);
    this.lettersTyped = null;
  }

  userTyping(e) {
    const {
      target: { value }
    } = e;
    this.lettersTyped = value;
  }

  render() {
    const { artists, onSearchArtist, onArtistSelected } = this.props;
    return (
      <div className="search-artist--container">
        <input
          className="search-artist--input"
          placeholder="Search here"
          onChange={this.userTyping}
        />

        {artists.loading && <Loader />}

        {!!artists.length && (
          <div className="search-artist--dropdown">
            <p className="search-artist--dropdown--title">Search Results</p>
            <div className="search-artist--dropdown--elements">
              {artists.map(artist => (
                <div
                  key={`search-artist--dropdown::${artist.name}`}
                  className="search-artist--dropdown--element"
                  onClick={() => onArtistSelected(artist)}
                >
                  <p className="search-artist--dropdown--element-text">
                    {artist.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        <div
          className="search-artist--button"
          onClick={() => onSearchArtist(this.lettersTyped)}
        >
          <p>Search</p>
        </div>
      </div>
    );
  }
}

export default SearchArtist;
