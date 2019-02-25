import React from "react";
import "./index.scss";
import Album from "../Album";
import Loader from "../Loader";

const pad = number => (number < 10 ? "0" : "") + number;

const formatTime = time => {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  return `${pad(minutes)}:${pad(seconds)}`;
};

const AlbumDetail = ({ album }) => (
  <div className="album-detail">
    <p className="album-detail__track-list__title">{album.title}</p>
    <div className="album-detail__track-list">
      <Album
        displayTitle={false}
        size="big"
        album={album}
        selectedAlbum={album}
      />
      <div className="offset-table">
        <div className="table__row table__row__headers">
          <p className="offset-table__element table__row__number">#</p>
          <p className="offset-table__element table__row__title">Title</p>
          <p className="offset-table__element table__row__artist">Artist</p>
          <p className="offset-table__element table__row__duration">Time</p>
          <p className="offset-table__element table__row__release-date">
            Released
          </p>
        </div>
        {album.tracks.loading && (
          <div className="table__row">
            <Loader />
          </div>
        )}
        {album.tracks.map((track, i) => (
          <div className="table__row" key={`track::${track.title}::${i}`}>
            <p className="offset-table__element table__row__number">{i + 1}</p>
            <p className="offset-table__element table__row__title">
              {track.title}
            </p>
            <p className="offset-table__element table__row__artist">
              {track.artist.name}
            </p>
            <p className="offset-table__element table__row__duration">
              {formatTime(track.duration)}
            </p>
            <p className="offset-table__element table__row__release-date">
              {album.release_date}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default AlbumDetail;
