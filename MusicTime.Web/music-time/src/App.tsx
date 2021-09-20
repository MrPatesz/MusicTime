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
import { useDispatch } from "react-redux";
import { clearQueue } from "./redux/queue";

const App = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(
    localStorage.getItem("authToken") ? true : false
  );

  const dispatch = useDispatch();

  function logout() {
    dispatch(clearQueue());
    localStorage.removeItem("authToken");
    setLoggedIn(false);
  }

  const home = "/";
  const artists = "/artists";
  const albums = "/albums";
  const songs = "/songs";
  const playlists = "/playlists";
  const welcome = "/welcome";
  const login = "/login";

  const [currentRoute, setCurrentRoute] = useState<string>(home);

  function getLinkForRoute(route: string, name: string) {
    return (
      <Link
        className={
          route === currentRoute ? "nav-link text-light" : "nav-link text-info"
        }
        to={route}
        onClick={() => setCurrentRoute(route)}
      >
        {name}
      </Link>
    );
  }

  return (
    <Router>
      <div className="App">
        <Navbar bg="dark" variant="dark">
          {loggedIn ? (
            <Nav>
              {getLinkForRoute(home, "Home")}
              {getLinkForRoute(artists, "Artists")}
              {getLinkForRoute(albums, "Albums")}
              {getLinkForRoute(songs, "Songs")}
              {getLinkForRoute(playlists, "Playlists")}
            </Nav>
          ) : (
            getLinkForRoute(welcome, "Welcome")
          )}
          <Nav className="ml-auto">
            {loggedIn ? (
              <Link className="nav-link text-info" onClick={logout}>
                Logout
              </Link>
            ) : (
              getLinkForRoute(login, "Login")
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
        {loggedIn ? <MusicPlayerComponent></MusicPlayerComponent> : <div></div>}
      </div>
    </Router>
  );
};

export default App;
