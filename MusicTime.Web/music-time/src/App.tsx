import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./App.css";
import SongDto from "./Models/SongDto";
import ArtistsPage from "./Pages/ArtistsPage";
import AlbumsPage from "./Pages/AlbumsPage";

const App = () => {
  const [songs, setSongs] = useState<SongDto[]>([]);

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

  return (
    <Router>
      <div className="App">
        <Navbar bg="dark" variant="dark">
          <Nav>
            <Link className="nav-link text-info" to="/">
              Home
            </Link>
            <Link className="nav-link text-info" to="/artists">
              Artists
            </Link>
            <Link className="nav-link text-info" to="/albums">
              Albums
            </Link>
            <Link className="nav-link text-info" to="/songs">
              Songs
            </Link>
          </Nav>
          <Nav className="ml-auto">
            <Link className="nav-link text-info" to="/login">
              Login
            </Link>
          </Nav>
        </Navbar>
        <Switch>
          <Route exact path="/"></Route>
          <Route exact path="/artists">
            <ArtistsPage></ArtistsPage>
          </Route>
          <Route exact path="/albums">
            <AlbumsPage></AlbumsPage>
          </Route>
          <Route exact path="/songs">
            <h1>Songs:</h1>
            <ul>
              {songs.map((s) => (
                <li key={s.id}>{s.title}</li>
              ))}
            </ul>
          </Route>
          <Route exact path="/login"></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
