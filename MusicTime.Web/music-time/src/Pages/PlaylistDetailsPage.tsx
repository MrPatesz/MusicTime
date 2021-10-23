import PlaylistSongComponent from "../Components/SongComponents/PlaylistSongComponent";
import { useState } from "react";
import { useRouteMatch } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Image from "react-bootstrap/Image";
import AddSongToPlaylistComponent from "../Components/PlaylistComponents/AddSongToPlaylistComponent";
import NewPlaylistComponent from "../Components/PlaylistComponents/NewPlaylistComponent";
import { useDispatch } from "react-redux";
import { addToHistory, setQueue } from "../redux/player";
import { Config } from "../config";
import { Container, Row, Col } from "react-bootstrap";
import usePlaylist from "../Hooks/Queries/PlaylistQueries/usePlaylist";
import usePlaylistsSongs from "../Hooks/Queries/PlaylistQueries/usePlaylistsSongs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import QueryComponent from "../Components/QueryComponent";

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
    <div>
      <div>
        <QueryComponent
          isFetching={isPlaylistFetching}
          error={playlistError}
          data={playlist}
          ChildJSX={() => (
            <div className="d-flex flex-row m-4">
              <Image
                src={
                  playlist!.coverGuid === null
                    ? "/placeholder.png"
                    : Config.picturePath + playlist!.coverGuid + ".png"
                }
                rounded
                style={{
                  width: "15rem",
                  height: "15rem",
                }}
                className="mb-2 mr-4"
              />
              <div className="d-flex flex-column">
                <h1>{playlist!.title}</h1>
                <p>{playlist!.description}</p>
              </div>

              <ButtonGroup vertical className="ml-auto mb-auto">
                <Button
                  title="Edit"
                  variant="outline-info"
                  onClick={() => setShowEditPlaylist(true)}
                  className="mb-2"
                >
                  <FontAwesomeIcon icon="edit" size="lg" />
                </Button>
                <Button
                  title="Add to Queue"
                  variant="outline-info"
                  onClick={() => {
                    dispatch(setQueue(songs ?? []));
                    dispatch(addToHistory({ id: id, type: "playlist" }));
                  }}
                >
                  <FontAwesomeIcon icon="play" size="lg" />
                </Button>
              </ButtonGroup>
            </div>
          )}
        ></QueryComponent>
      </div>
      <div>
        <div className="d-flex flex-row mx-4 mb-3">
          <h2>Songs</h2>
          <AddSongToPlaylistComponent
            playlistId={id}
          ></AddSongToPlaylistComponent>
        </div>

        <div className="d-flex flex-row ml-2 mr-4">
          <Container fluid>
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

          <ButtonGroup className="ml-auto invisible">
            <Button variant="outline-warning">
              <FontAwesomeIcon icon="trash-alt" size="lg" />
            </Button>
          </ButtonGroup>
        </div>

        <div className="overflow-auto">
          <QueryComponent
            isFetching={areSongsFetching}
            error={songsError}
            data={songs}
            ChildJSX={() => (
              <ul className="no-bullets">
                {(songs ?? []).map((s, i) => (
                  <li key={s.songId} className={i % 2 !== 0 ? "bg-dark" : ""}>
                    <PlaylistSongComponent
                      detailedSongDto={s}
                      playlistId={id}
                    ></PlaylistSongComponent>
                  </li>
                ))}
              </ul>
            )}
          ></QueryComponent>
        </div>
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
