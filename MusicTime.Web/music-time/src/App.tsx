import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
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
import MusicPlayerComponent from "./Components/MusicPlayer/MusicPlayerComponent";
import { useState } from "react";

const App = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(
    localStorage.getItem("authToken") ? true : false
  );

  function logout() {
    localStorage.removeItem("authToken");
    setLoggedIn(false);
  }

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
            {loggedIn ? (
              <Link className="nav-link text-info" onClick={logout}>
                Logout
              </Link>
            ) : (
              <Link className="nav-link text-info" to="/login">
                Login
              </Link>
            )}
          </Nav>
        </Navbar>
        <Switch>
          <Route exact path="/">
            {loggedIn ? <div></div> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/artists">
            {loggedIn ? <ArtistsPage></ArtistsPage> : <Redirect to="/login" />}
          </Route>
          <Route exact path={"/artists/:id"}>
            {loggedIn ? (
              <ArtistDetailsPage></ArtistDetailsPage>
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route exact path="/albums">
            {loggedIn ? <AlbumsPage></AlbumsPage> : <Redirect to="/login" />}
          </Route>
          <Route exact path={"/albums/:id"}>
            {loggedIn ? (
              <AlbumDetailsPage></AlbumDetailsPage>
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route exact path="/songs">
            {loggedIn ? <SongsPage></SongsPage> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/playlists">
            {loggedIn ? (
              <PlaylistsPage></PlaylistsPage>
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route exact path={"/playlists/:id"}>
            {loggedIn ? (
              <PlaylistDetailsPage></PlaylistDetailsPage>
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route exact path="/login">
            {loggedIn ? (
              <Redirect to="/" />
            ) : (
              <LoginPage setLoggedIn={setLoggedIn}></LoginPage>
            )}
          </Route>
        </Switch>
        <MusicPlayerComponent></MusicPlayerComponent>
      </div>
    </Router>
  );
};

export default App;
