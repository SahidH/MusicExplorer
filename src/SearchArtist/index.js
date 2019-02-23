import React, { Component } from "react";
import "./index.scss";
const SearchArtist = ({ artists, onSearchArtist, onArtistSelected }) => (
    <div className="search-artist--container">
      <input
        className="search-artist--input"
        placeholder="Search here"
        onChange={onSearchArtist}
      />
      {!!artists.length && (
        <div className="search-artist--dropdown">
          <p className="search-artist--dropdown--title">
            Search Results
          </p>
          <div className="search-artist--dropdown--elements">
            {artists.map(artist => (
              <div className="search-artist--dropdown--element">
                <p
                  className="search-artist--dropdown--element-text"
                  onClick={() => onArtistSelected(artist)}
                >
                  {artist.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
export default SearchArtist;