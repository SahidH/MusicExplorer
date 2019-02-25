import { combineReducers } from "redux";
import {
  SELECT_ARTIST,
  SELECT_ALBUM,
  SEARCH_ARTIST,
  REQUEST_SEARCH_ARTISTS,
  RECEIVE_ARTISTS,
  REQUEST_ALBUMS,
  RECEIVE_ALBUMS,
  REQUEST_TRACKS,
  RECEIVE_TRACKS
} from "../actions";

function selected(
  state = { artist: null, album: null, searchArtist: null },
  action
) {
  switch (action.type) {
    case SELECT_ARTIST:
      return {
        ...state,
        artist: action.artist
      };
    case SELECT_ALBUM:
      return {
        ...state,
        album: action.album
      };
    case SEARCH_ARTIST:
      return {
        ...state,
        searchArtist: action.searchArtist
      };
    default:
      return state;
  }
}

function artistStore(
  state = { searchArtist: null, artists: [], loading: false },
  action
) {
  switch (action.type) {
    case SEARCH_ARTIST:
      return {
        ...state,
        searchArtist: action.searchArtist
      };
    case REQUEST_SEARCH_ARTISTS:
      return {
        ...state,
        loading: true
      };
    case RECEIVE_ARTISTS:
      return {
        ...state,
        loading: false,
        artists: action.artists
      };
    case RECEIVE_ALBUMS:
      return {
        artists: []
      };
    default:
      return state;
  }
}

function albumStore(state = { albums: [], loading: false }, action) {
  switch (action.type) {
    case REQUEST_ALBUMS:
      return {
        ...state,
        loading: true
      };
    case RECEIVE_ALBUMS:
      return {
        ...state,
        loading: false,
        albums: action.albums
      };
    default:
      return state;
  }
}

function trackStore(state = { tracks: [], loading: false }, action) {
  switch (action.type) {
    case REQUEST_TRACKS:
      return {
        ...state,
        loading: true
      };
    case RECEIVE_TRACKS:
      return {
        ...state,
        loading: false,
        tracks: action.tracks
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  selected,
  artistStore,
  albumStore,
  trackStore
});

export default rootReducer;
