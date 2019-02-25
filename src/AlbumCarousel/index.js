import React from "react";
import "./index.scss";
import Album from "../Album";
import Loader from "../Loader";

const AlbumCarousel = ({ albums, selectedAlbum, onAlbumSelected, loading }) => (
  <div className="albums-scroll">
    {loading && <Loader />}
    {!loading && (
      <div className="albums-scroll__container">
        {albums.map((album, i) => (
          <Album
            key={`albums-scroll::${i}`}
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
