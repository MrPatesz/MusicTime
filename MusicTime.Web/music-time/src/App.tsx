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

const App = () => {
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
          <Route exact path={"/artists/:id"}>
            <ArtistDetailsPage></ArtistDetailsPage>
          </Route>
          <Route exact path="/albums">
            <AlbumsPage></AlbumsPage>
          </Route>
          <Route exact path={"/albums/:id"}>
            <AlbumDetailsPage></AlbumDetailsPage>
          </Route>
          <Route exact path="/songs">
            <SongsPage></SongsPage>
          </Route>
          <Route exact path="/login">
            <LoginPage></LoginPage>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
