import axios from "axios";

import { appLoading, appDoneLoading } from "../appState/actions";

import { selectSearchInput } from "../searchInput/selectors";
import { spotifyLogOut } from "../spotifyToken/actions";

export const FETCH_SPOTIFY_MUSIC = "FETCH_SPOTIFY_MUSIC";
export const NEW_SPOTIFY_MUSIC = "NEW_SPOTIFY_MUSIC";
export const CLEAR_SPOTIFY_MUSIC = "CLEAR_SPOTIFY_MUSIC";

export const fetchSpotifyMusicSucces = (spotifyMusic) => {
  return {
    type: FETCH_SPOTIFY_MUSIC,
    payload: spotifyMusic,
  };
};

export const fetchNewReleasesSpotifySucces = (spotifyMusic) => {
  return {
    type: NEW_SPOTIFY_MUSIC,
    payload: spotifyMusic,
  };
};

export const clearSpotifyMusic = (spotifyMusic) => {
  return {
    type: CLEAR_SPOTIFY_MUSIC,
    payload: spotifyMusic,
  };
};

export const fetchSpotifyMusic = () => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const spotifyToken = localStorage.getItem("spotifyToken");
      const searchInput = selectSearchInput(getState());

      const response = await axios.get(
        `https://api.spotify.com/v1/search?q=${searchInput}&type=track%2Cartist&offest=0&limit=50`,
        {
          headers: {
            Authorization: `Bearer ${spotifyToken}`,
          },
        },
      );
      console.log("search results", response.data.tracks);
      dispatch(fetchSpotifyMusicSucces(response.data.tracks));

      dispatch(appDoneLoading());
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        localStorage.setItem("noSpotifyToken", true);
        dispatch(spotifyLogOut());
        dispatch(appDoneLoading());
      }
    }
  };
};

export const fetchNewReleasesSpotify = () => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const spotifyToken = localStorage.getItem("spotifyToken");

      const response = await axios.get(
        "https://api.spotify.com/v1/browse/new-releases?offset=0&limit=50",
        {
          headers: {
            Authorization: `Bearer ${spotifyToken}`,
          },
        },
      );

      console.log("initial response (NEW):", response.data.albums);
      dispatch(fetchNewReleasesSpotifySucces(response.data.albums));
    } catch (error) {
      console.log("Error:", error);
      if (error.response.status === 401) {
        localStorage.setItem("noSpotifyToken", true);
        dispatch(spotifyLogOut());
        dispatch(appDoneLoading());
      }
    }
  };
};
