export const SELECT_ARTIST = "SELECT_ARTIST";
export const SELECT_ALBUM = "SELECT_ALBUM";
export const SEARCH_ARTIST = "SEARCH_ARTIST";
export const REQUEST_SEARCH_ARTISTS = "REQUEST_SEARCH_ARTISTS";
export const RECEIVE_ARTISTS = "RECEIVE_ARTISTS";
export const REQUEST_ALBUMS = "REQUEST_ALBUMS";
export const RECEIVE_ALBUMS = "RECEIVE_ALBUMS";
export const REQUEST_TRACKS = "REQUEST_TRACKS";
export const RECEIVE_TRACKS = "RECEIVE_TRACKS";

export function selectArtist({ artist }) {
  return {
    type: SELECT_ARTIST,
    artist
  };
}

export function selectAlbum({ album }) {
  return {
    type: SELECT_ALBUM,
    album
  };
}

export function queryArtist({ searchArtist }) {
  return {
    type: SEARCH_ARTIST,
    searchArtist
  };
}

export function requestSearchArtists() {
  return {
    type: REQUEST_SEARCH_ARTISTS
  };
}

export function receiveArtists({ artists }) {
  return {
    type: RECEIVE_ARTISTS,
    receivedAt: Date.now(),
    artists
  };
}

export function requestAlbums() {
  return {
    type: REQUEST_ALBUMS
  };
}

export function receiveAlbums({ albums }) {
  return {
    type: RECEIVE_ALBUMS,
    receivedAt: Date.now(),
    albums
  };
}

export function requestTracks() {
  return {
    type: REQUEST_TRACKS
  };
}

export function receiveTracks({ tracks }) {
  return {
    type: RECEIVE_TRACKS,
    receivedAt: Date.now(),
    tracks
  };
}
