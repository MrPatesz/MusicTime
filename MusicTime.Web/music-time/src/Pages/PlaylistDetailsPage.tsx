import PlaylistSongComponent from "../Components/SongComponents/PlaylistSongComponent";
import { useState } from "react";
import { useRouteMatch } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Image from "react-bootstrap/Image";
import Spinner from "react-bootstrap/Spinner";
import AddSongToPlaylistComponent from "../Components/PlaylistComponents/AddSongToPlaylistComponent";
import NewPlaylistComponent from "../Components/PlaylistComponents/NewPlaylistComponent";
import { useDispatch } from "react-redux";
import { setQueue } from "../redux/queue";
import { Config } from "../config";
import { Container, Row, Col } from "react-bootstrap";
import usePlaylist from "../Hooks/usePlaylist";
import usePlaylistsSongs from "../Hooks/usePlaylistsSongs";
import Alert from "react-bootstrap/Alert";

function PlaylistDetailsPage() {
  const dispatch = useDispatch();
  let id = useRouteMatch("/playlists/:id").params.id;
  const [showEditPlaylist, setShowEditPlaylist] = useState<boolean>(false);

  const {
    data: playlist,
    error: playlistError,
    isFetching: isPlaylistFetching,
  } = usePlaylist(id);

  const {
    data: songs,
    error: songsError,
    isFetching: areSongsFetching,
  } = usePlaylistsSongs(id);

  return (
    <div className="page">
      <div>
        {playlistError ? (
          <Alert variant="danger">An error occurred while fetching data!</Alert>
        ) : playlist ? (
          <div className="d-flex flex-row">
            <Image
              src={
                playlist.coverGuid === null
                  ? "/placeholder.png"
                  : Config.picturePath + playlist.coverGuid + ".png"
              }
              rounded
              style={{
                width: "15rem",
                height: "15rem",
              }}
              className="mb-2 mr-4"
            />
            <div className="d-flex flex-column">
              <h1>{playlist.title}</h1>
              <p>{playlist.description}</p>
            </div>

            <ButtonGroup vertical className="ml-auto mb-auto">
              <Button
                variant="outline-info"
                onClick={() => setShowEditPlaylist(true)}
                className="mb-2"
              >
                Edit
              </Button>
              <Button
                variant="outline-info"
                onClick={() => dispatch(setQueue(songs ?? []))}
              >
                Play
              </Button>
            </ButtonGroup>
          </div>
        ) : isPlaylistFetching ? (
          <Spinner animation="grow" variant="info" />
        ) : (
          <div></div>
        )}
      </div>
      <div>
        <div className="d-flex flex-row mb-3 mt-2">
          <h2>Songs</h2>
          <AddSongToPlaylistComponent
            playlistId={id}
          ></AddSongToPlaylistComponent>
        </div>

        <Container
          fluid
          style={{
            width: "calc(100% - 82.656px)",
            left: "-40px",
            position: "relative",
          }}
        >
          <Row>
            <Col xs={12} sm={8} lg={6}>
              <h4>Title</h4>
            </Col>

            <Col className="d-none d-sm-block" sm={4} md={3}>
              <h4>Artist</h4>
            </Col>

            <Col className="d-none d-lg-block" lg={3}>
              <h4>Album</h4>
            </Col>
          </Row>
        </Container>

        {songsError ? (
          <Alert variant="danger">An error occurred while fetching data!</Alert>
        ) : songs ? (
          <ul className="no-bullets">
            {songs.map((s, i) => (
              <li key={s.songId} className={i % 2 !== 0 ? "bg-dark" : ""}>
                <PlaylistSongComponent
                  detailedSongDto={s}
                  playlistId={id}
                ></PlaylistSongComponent>
              </li>
            ))}
          </ul>
        ) : areSongsFetching ? (
          <Spinner animation="grow" variant="info" />
        ) : (
          <div></div>
        )}
      </div>

      {playlist ? (
        <NewPlaylistComponent
          show={showEditPlaylist}
          setShow={setShowEditPlaylist}
          isEdited={true}
          editedPlaylist={playlist}
        ></NewPlaylistComponent>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default PlaylistDetailsPage;
