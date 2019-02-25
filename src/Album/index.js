import React, { Component } from "react";
import "./index.scss";
import Loader from "../Loader";

class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    this.loadImage();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.album !== this.props.album ||
      this.props.size !== prevProps.size
    ) {
      this.loadImage();
    }
  }

  getImageUrl() {
    const { album, size = "medium" } = this.props;

    return album[`cover_${size}`];
  }

  loadImage() {
    this.setState({ loading: true });
    const imgTag = document.createElement("img");
    const src = this.getImageUrl();
    imgTag.src = src;
    imgTag.onload = () => this.setState({ loading: false });
  }

  render() {
    const {
      album,
      selectedAlbum,
      onAlbumSelected = () => {},
      displayTitle = true
    } = this.props;
    const { loading } = this.state;
    
    return (
      <div
        className={`album-cover ${
          selectedAlbum === album ? "album-cover--selected" : ""
        }`}
        onClick={() => onAlbumSelected(album)}
      >
        {loading && <Loader />}
        <div className="album-cover__image">
          {!loading && (
            <img
              title={album.title}
              alt={album.title}
              src={this.getImageUrl()}
            />
          )}
        </div>
        {displayTitle && <p className="album-cover__title">{album.title}</p>}
      </div>
    );
  }
}

export default Album;
