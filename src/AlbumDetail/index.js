import React, { Component } from "react";
import "./index.scss";
import Album from "../Album";
const formatTime = time => {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  return `${minutes}:${seconds}`;
};
const AlbumDetail = ({ album }) => (
  <div className="album-detail">
    <p className="album-detail__track-list__title title">{album.title.value}</p>
    <div className="album-detail__track-list">
      <Album
        displayTitle={false}
        size="big"
        album={album}
        selectedAlbum={album}
      />
      <div className="offset-table">
        <div className="table__row table__row__headers">
          <p className="table__row__number">#</p>
          <p className="offset-table__element table__row__title">
            Title
          </p>
          <p className="offset-table__element table__row__artist">
            Artist
          </p>
          <p className="offset-table__element table__row__duration">
            Time
          </p>
          <p className="offset-table__element table__row__release-date">
            Released
          </p>
        </div>
        {!album.tracks.loading &&
          album.tracks.value.map((track, i) => (
            <div className="table__row">
              <p className="table__row__number">
                {i + 1}
              </p>
              <p className="offset-table__element table__row__title">
                {track.title.value}
              </p>
              <p className="offset-table__element table__row__artist">
                {track.artist.value.name}
              </p>
              <p className="offset-table__element table__row__duration">
                {formatTime(track.duration.value)}
              </p>
              <p className="offset-table__element table__row__release-date">
                {album.release_date.value}
              </p>
            </div>
          ))}
      </div>
    </div>
  </div>
);
export default AlbumDetail;
