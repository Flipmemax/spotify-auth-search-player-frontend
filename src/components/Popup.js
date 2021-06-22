import "./Popup.css"
import { addSong } from "../store/PlaylistByID/actions";
import { selectPlaylists } from "../store/Playlists/selectors";
import { useDispatch, useSelector } from "react-redux";


export default function Popup(props) {
const playlists = useSelector(selectPlaylists)
const dispatch = useDispatch();

const artistlist = props.track.artists.map((artists) => {
  return artists.name
})
const space = ", "
const artist = artistlist.join(space)
const title = props.track.name;
const image = props.track.album.images[2].url;
const uri = props.track.uri;
const origin = "Spotify";

function Succes(playlist) {
  alert(`${title} - successfully added to "${playlist}"`)
}

  return ( 
      <div className="popup-box">
        <div className="box">
        <span className="close-icon" onClick={props.handleClose}>x</span>
        <div>
           <h3 className="green">
             Select Playlist to add 
             </h3>            
              
          <h3 className="grey">
           {artist} - <span className="title"> {props.track.name} </span>
          </h3>
          </div>
        {playlists.map((playlist) => {
        return (
          <div key={playlist.id} >
         <div className="selectPlaylist" onClick={() => {
           dispatch(addSong(title, artist, image, uri, origin, playlist.id ));
           Succes(playlist.name);
          }
          }>
         <p>{playlist.name}</p>
         </div>
        </div>
        )
        })}
      </div>
    </div>
  );
};