import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
//import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./App.css";
import SongDto from "./Models/SongDto";
import AlbumDto from "./Models/AlbumDto";
import ArtistDto from "./Models/ArtistDto";
import CardComponent from "./Components/CardComponent";

function App() {
  const [songs, setSongs] = useState<SongDto[]>([]);
  const [albums, setAlbums] = useState<AlbumDto[]>([]);
  const [artists, setArtists] = useState<ArtistDto[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("https://localhost:5001/api/songs");

      let songsArray: SongDto[] = [];

      result.data.forEach((song: SongDto) => {
        songsArray.push(new SongDto(song.id, song.title));
      });
      setSongs(songsArray);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("https://localhost:5001/api/albums");

      let albumsArray: AlbumDto[] = [];

      result.data.forEach((album: AlbumDto) => {
        albumsArray.push(
          new AlbumDto(
            album.id,
            album.title,
            album.genre,
            album.description,
            album.releaseYear,
            album.coverGuid
          )
        );
      });
      setAlbums(albumsArray);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("https://localhost:5001/api/artists");

      let artistsArray: ArtistDto[] = [];

      result.data.forEach((artist: ArtistDto) => {
        artistsArray.push(
          new ArtistDto(
            artist.id,
            artist.name,
            artist.description,
            artist.pictureGuid
          )
        );
      });
      setArtists(artistsArray);
    };
    fetchData();
  }, []);

  return (
    /*<Router>
      <Navbar bg="dark" variant="dark">
      <Nav>
        <Link className="nav-link text-info" to="/">
          Home
        </Link>
        <Link className="mr-auto nav-link text-info" to="/add-songs">
          Add Songs
        </Link>
        <Link className="mr-auto nav-link text-info" to="/playlist">
          Playlist
        </Link>
      </Nav>
    </Navbar>
    <Switch>
      <Route exact path="/">
        Home
      </Route>
      <Route path="/add-songs">
        AddSongs
      </Route>
      <Route path="/playlist">
        Playlist
      </Route>
    </Switch>*/
      <div className="App">
        <h1>Songs:</h1>
        <ul>
          {songs.map((s) => (
            <li key={s.id}>{s.title}</li>
          ))}
        </ul>
        <h1>Albums:</h1>
        <ul>
          {albums.map((s) => (
            <li key={s.id}>{s.title}</li>
          ))}
        </ul>
        <h1>Artists:</h1>

        {artists.map((s) => (
          <CardComponent title={s.name} pictureGuid={null}></CardComponent>
        ))}
      </div>
    //</Router>
  );
}

export default App;
