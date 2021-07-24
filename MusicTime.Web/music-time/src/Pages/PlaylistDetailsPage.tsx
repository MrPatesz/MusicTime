import PlaylistSongComponent from "../Components/SongComponents/PlaylistSongComponent";
import { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Image from "react-bootstrap/Image";
import Spinner from "react-bootstrap/Spinner";
import PlaylistDto from "../Models/PlaylistDto";
import AddSongToPlaylistComponent from "../Components/PlaylistComponents/AddSongToPlaylistComponent";
import DetailedSongDto from "../Models/DetailedSongDto";
import axios from "axios";
import NewPlaylistComponent from "../Components/PlaylistComponents/NewPlaylistComponent";
import { useDispatch } from "react-redux";
import { setQueue } from "../redux/queue";
import { Config } from "../config";
import { Container, Row, Col } from "react-bootstrap";

function PlaylistDetailsPage() {
  const dispatch = useDispatch();

  const apiBase = Config.apiUrl;

  let id = useRouteMatch("/playlists/:id").params.id;

  const [playlist, setPlaylist] = useState<PlaylistDto>(
    new PlaylistDto(0, "", null, null)
  );
  const [playlistIsLoading, setPlaylistIsLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      const result = await axios.get(apiBase + "playlists/" + id, config);

      setPlaylist(result.data);
      setPlaylistIsLoading(false);
    })();
  }, [id, apiBase]);

  const [songs, setSongs] = useState<DetailedSongDto[]>([]);
  const [songsStillLoading, setSongsStillLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      const result = await axios.get(
        apiBase + "playlists/" + id + "/songs",
        config
      );

      setSongs(result.data);
      setSongsStillLoading(false);
    })();
  }, [apiBase, id]);

  const [showEditPlaylist, setShowEditPlaylist] = useState<boolean>(false);

  return (
    <div className="page">
      <div>
        {playlistIsLoading ? (
          <Spinner animation="grow" variant="info" />
        ) : (
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
                onClick={() => dispatch(setQueue(songs))}
              >
                Play
              </Button>
            </ButtonGroup>
          </div>
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

        {songsStillLoading ? (
          <Spinner animation="grow" variant="info" />
        ) : (
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
        )}
      </div>

      <NewPlaylistComponent
        show={showEditPlaylist}
        setShow={setShowEditPlaylist}
        isEdited={true}
        editedPlaylist={playlist}
      ></NewPlaylistComponent>
    </div>
  );
}

export default PlaylistDetailsPage;
