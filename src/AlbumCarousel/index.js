import React, { Component } from "react";
import "./index.scss";
import Album from "../Album";
import Loader from "../Loader";
const AlbumCarousel = ({ albums, selectedAlbum, onAlbumSelected }) => (
  <div className="albums-scroll">
    {albums.loading && <Loader/>}
    {!albums.loading && (
      <div
        className="albums-scroll__container"
        style={{
          width: `${albums.length * (10 + 0.6 * 2)}em`
        }}
      >
        {albums.map(album => (
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
