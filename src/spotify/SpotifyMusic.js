import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AddSongButton from "../components/AddSongButton";
import MusicComponent from "../components/MusicComponent";
import "../components/MusicComponent.css";

import { setSpotifySong } from "../store/playSong/actions";
import { selectSpotifyMusic } from "../store/spotifyMusic/selectors";

export default function SpotifyMusic() {
  const song = useSelector(selectSpotifyMusic);

  const [track, setTrack] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSpotifySong(track));
  }, [dispatch, track]);

  return (
    <div className="mainBox">
      {song.items?.map((tracks) => {
        return (
          <div key={tracks.id}>
            <div className="musicBox">
              <div onClick={() => setTrack(tracks.uri)} className="playSong">
                <MusicComponent img={tracks.album.images[2].url} />
              </div>
              <div className="songTitleArtistBox">
                <div className="defaultTitleText">
                  <MusicComponent title={tracks.name} />
                </div>
                {tracks.artists.map((artists) => {
                  return (   
                  <div className="defaultArtistText" key={artists.id}>
                    <MusicComponent artist={artists.name} />
                  </div>             
                  );
                })}
                <AddSongButton tracks={tracks} /> 
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
