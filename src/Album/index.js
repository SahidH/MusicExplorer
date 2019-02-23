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
      title={album.title.value}
      src={album[`cover_${size}`].value}
    />
    {displayTitle && <p className="album-cover__title">{album.title.value}</p>}
  </div>
);
export default Album;
