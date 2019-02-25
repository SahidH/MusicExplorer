import { take, put, call, fork, select } from "redux-saga/effects";
import * as actions from "../actions";
import {
  searchArtistSelector,
  selectedArtistSelector,
  selectedAlbumSelector
} from "../reducers/selectors";

export function typesApi({ type, id, prop }) {
  return fetch(`/${type}/${id}/${prop ? `${prop}/` : ""}`)
    .then(response => response.json())
    .then(({ data }) => data);
}

export function searchApi({ type, query }) {
  return fetch(`/search/${type}/?q=${query}`)
    .then(response => response.json())
    .then(({ data }) => data);
}

export function* searchArtist({ searchArtist }) {
  if (searchArtist) {
    yield put(actions.queryArtist({ searchArtist }));
    const artists = yield call(searchApi, {
      type: "artist",
      query: searchArtist
    });
    yield put(actions.receiveArtists({ artists }));
  } else {
    yield put(actions.receiveArtists({ artists: [] }));
  }
}

export function* fetchAlbumsByArtist({ artist: { type, id } }) {
  yield put(actions.requestAlbums());
  const albums = yield call(typesApi, { type, id, prop: "albums" });
  yield put(actions.receiveAlbums({ albums }));
}

export function* fetchTracksByAlbum({ album: { type, id } }) {
  yield put(actions.requestTracks());
  const tracks = yield call(typesApi, { type, id, prop: "tracks" });
  yield put(actions.receiveTracks({ tracks }));
}

export function* queryArtist() {
  while (true) {
    const prevSearchArtist = yield select(searchArtistSelector);
    yield take(actions.SEARCH_ARTIST);
    const newSearchArtist = yield select(searchArtistSelector);
    if (prevSearchArtist !== newSearchArtist) {
      yield fork(searchArtist, { searchArtist: newSearchArtist });
    }
  }
}

export function* selectArtist() {
  while (true) {
    const prevArtist = yield select(selectedArtistSelector);
    yield take(actions.SELECT_ARTIST);
    const newArtist = yield select(selectedArtistSelector);
    if (prevArtist !== newArtist) {
      yield fork(fetchAlbumsByArtist, { artist: newArtist });
    }
  }
}

export function* selectAlbum() {
  while (true) {
    const prevAlbum = yield select(selectedAlbumSelector);
    yield take(actions.SELECT_ALBUM);
    const newAlbum = yield select(selectedAlbumSelector);
    if (prevAlbum !== newAlbum) {
      yield fork(fetchTracksByAlbum, { album: newAlbum });
    }
  }
}

export default function* root() {
  yield fork(queryArtist);
  yield fork(selectArtist);
  yield fork(selectAlbum);
}
