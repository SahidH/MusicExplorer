import React, { Component } from "react";
import "./index.scss";
const Album = ({
  album,
  selectedAlbum,
  onAlbumSelected = () => {},
  size = "medium",
  displayTitle = true
}) => (
  <div
    className={`album-cover ${
      selectedAlbum === album ? "album-cover--selected" : ""
    }`}
    onClick={() => onAlbumSelected(album)}
  >
    <img
      className="album-cover__image"
      title={album.title}
      src={album[`cover_${size}`]}
    />
    {displayTitle && <p className="album-cover__title">{album.title}</p>}
  </div>
);
export default Album;
