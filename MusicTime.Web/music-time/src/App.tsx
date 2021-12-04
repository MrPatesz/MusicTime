import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Link, Redirect, useLocation } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./App.css";
import ArtistsPage from "./Pages/ArtistsPage";
import AlbumsPage from "./Pages/AlbumsPage";
import ArtistDetailsPage from "./Pages/ArtistDetailsPage";
import AlbumDetailsPage from "./Pages/AlbumDetailsPage";
import LoginPage from "./Pages/LoginPage";
import SongsPage from "./Pages/SongsPage";
import HomePage from "./Pages/HomePage";
import ProfilePage from "./Pages/ProfilePage";
import WelcomePage from "./Pages/WelcomePage";
import PlaylistsPage from "./Pages/PlaylistsPage";
import PlaylistDetailsPage from "./Pages/PlaylistDetailsPage";
import MusicPlayerComponent from "./Components/MusicPlayer/MusicPlayerComponent";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { clearHistory, clearQueue } from "./redux/player";
import axios from "axios";
import { Config } from "./config";

const App = () => {
  const home = "/";
  const artists = "/artists";
  const albums = "/albums";
  const songs = "/songs";
  const playlists = "/playlists";
  const welcome = "/welcome";
  const login = "/login";
  const profile = "/profile";

  const currentRoute: string = useLocation().pathname;
  const [loggedIn, setLoggedIn] = useState<boolean>(
    localStorage.getItem("authToken") ? true : false
  );

  const dispatch = useDispatch();

  function logout() {
    dispatch(clearQueue());
    dispatch(clearHistory());
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    setLoggedIn(false);
  }

  function getLinkForRoute(route: string, name: string) {
    return (
      <Link
        className={
          (
            route === "/"
              ? currentRoute === route
              : currentRoute.includes(route)
          )
            ? "nav-link text-light"
            : "nav-link text-info"
        }
        to={route}
      >
        {name}
      </Link>
    );
  }

  if (loggedIn) {
    let apiLink = Config.apiUrl + "users/login/valid";
    let config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    axios
      .get(apiLink, config)
      .then((res) => res.data)
      .catch(() => logout());
  }

  return (
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
        <div className="ml-auto">
          {loggedIn ? (
            <Nav>
              {getLinkForRoute(profile, "Profile")}
              <Link className="nav-link text-info" onClick={logout}>
                Logout
              </Link>
            </Nav>
          ) : (
            <Nav>{getLinkForRoute(login, "Login")}</Nav>
          )}
        </div>
      </Navbar>
      <Switch>
        <Route exact path="/login">
          {loggedIn ? (
            <Redirect to="/" />
          ) : (
            <LoginPage setLoggedIn={setLoggedIn} />
          )}
        </Route>
        <Route exact path="/welcome">
          {loggedIn ? <Redirect to="/" /> : <WelcomePage />}
        </Route>

        <Route exact path="/">
          {loggedIn ? <HomePage /> : <Redirect to="/welcome" />}
        </Route>

        {loggedIn ? (
          <div>
            <Route exact path="/artists">
              <ArtistsPage />
            </Route>
            <Route exact path={"/artists/:id"}>
              <ArtistDetailsPage />
            </Route>
            <Route exact path="/albums">
              <AlbumsPage />
            </Route>
            <Route exact path={"/albums/:id"}>
              <AlbumDetailsPage />
            </Route>
            <Route exact path="/songs">
              <SongsPage />
            </Route>
            <Route exact path="/playlists">
              <PlaylistsPage />
            </Route>
            <Route exact path={"/playlists/:id"}>
              <PlaylistDetailsPage />
            </Route>
            <Route exact path={"/profile"}>
              <ProfilePage />
            </Route>
          </div>
        ) : (
          <Redirect to="/login" />
        )}
      </Switch>
      {loggedIn ? (
        <MusicPlayerComponent disableQueuetoPlaylist={false} />
      ) : (
        <div />
      )}
    </div>
  );
};

export default App;
