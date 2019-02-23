import React, { Component } from "react";
import "./index.scss";
import Album from "../Album";
const AlbumCarousel = ({ albums, selectedAlbum, onAlbumSelected }) => (
  <div className="albums-scroll">
    {!albums.loading && (
      <div
        className="albums-scroll__container"
        style={{
          width: `${albums.value.length * (10 + 0.6 * 2)}em`
        }}
      >
        {albums.value.map(album => (
          <Album
            album={album}
            onAlbumSelected={onAlbumSelected}
            selectedAlbum={selectedAlbum}
          />
        ))}
      </div>
    )}
  </div>
);
export default AlbumCarousel;
