import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./App.css";
import ArtistsPage from "./Pages/ArtistsPage";
import AlbumsPage from "./Pages/AlbumsPage";
import ArtistDetailsPage from "./Pages/ArtistDetailsPage";
import AlbumDetailsPage from "./Pages/AlbumDetailsPage";
import LoginPage from "./Pages/LoginPage";
import SongsPage from "./Pages/SongsPage";
import PlaylistsPage from "./Pages/PlaylistsPage";
import PlaylistDetailsPage from "./Pages/PlaylistDetailsPage";
import MusicPlayerComponent from "./Components/MusicPlayerComponent";
import { useState } from "react";

const App = () => {
  const [urlArray, setUrlArray] = useState<string[]>([
    "https://www.youtube.com/watch?v=1givs65YWBg",
    "https://soundcloud.com/jahseh-onfroy/the-fall",
    "https://www.youtube.com/watch?v=lZ6hku1lbaQ",
    "https://soundcloud.com/miliy_10/toxic",
  ]);
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
            <Link className="nav-link text-info" to="/playlists">
              Playlists
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
          <Route exact path={"/artists/:id"}>
            <ArtistDetailsPage setUrlArray={setUrlArray}></ArtistDetailsPage>
          </Route>
          <Route exact path="/albums">
            <AlbumsPage></AlbumsPage>
          </Route>
          <Route exact path={"/albums/:id"}>
            <AlbumDetailsPage setUrlArray={setUrlArray}></AlbumDetailsPage>
          </Route>
          <Route exact path="/songs">
            <SongsPage setUrlArray={setUrlArray}></SongsPage>
          </Route>
          <Route exact path="/playlists">
            <PlaylistsPage></PlaylistsPage>
          </Route>
          <Route exact path={"/playlists/:id"}>
            <PlaylistDetailsPage setUrlArray={setUrlArray}></PlaylistDetailsPage>
          </Route>
          <Route exact path="/login">
            <LoginPage></LoginPage>
          </Route>
        </Switch>
        <MusicPlayerComponent urlArray={urlArray}></MusicPlayerComponent>
      </div>
    </Router>
  );
};

export default App;
