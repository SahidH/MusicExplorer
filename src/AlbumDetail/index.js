import React, { Component } from "react";
import "./index.scss";
import Album from "../Album";
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
      <div className="album-detail__track-list__details">
        <div className="album-detail__track-list__details__table album-detail__track-list__details__table__header">
          <p className="album-detail__track-list__details__table__number">
            #
          </p>
          <p className="album-detail__track-list__details__element album-detail__track-list__details__table__title">
            Title
          </p>
          <p className="album-detail__track-list__details__element album-detail__track-list__details__table__artist">
            Artist
          </p>
          <p className="album-detail__track-list__details__element album-detail__track-list__details__table__duration">
            Time
          </p>
          <p className="album-detail__track-list__details__element album-detail__track-list__details__table__release-date">
            Released
          </p>
        </div>
        {!album.tracks.loading &&
          album.tracks.value.map((track, i) => (
            <div className="album-detail__track-list__details__table">
              <p className="album-detail__track-list__details__table__number">
                {i + 1}
              </p>
              <p className="album-detail__track-list__details__element album-detail__track-list__details__table__title">
                {track.title.value}
              </p>
              <p className="album-detail__track-list__details__element album-detail__track-list__details__table__artist">
                {track.artist.value.name}
              </p>
              <p className="album-detail__track-list__details__element album-detail__track-list__details__table__duration">
                {track.duration.value}
              </p>
              <p className="album-detail__track-list__details__element album-detail__track-list__details__table__release-date">
                {album.release_date.value}
              </p>
            </div>
          ))}
      </div>
    </div>
  </div>
);
export default AlbumDetail;
