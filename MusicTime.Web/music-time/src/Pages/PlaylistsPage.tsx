import { useEffect, useState } from "react";
import CardComponent from "../Components/CardComponent";
import { Container, Row, Col } from "react-bootstrap";
import PlaylistDto from "../Models/PlaylistDto";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import NewPlaylistComponent from "../Components/PlaylistComponents/NewPlaylistComponent";
import usePlaylists from "../Hooks/Queries/PlaylistQueries/usePlaylists";
import Alert from "react-bootstrap/Alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function PlaylistsPage() {
  const [showAddPlaylist, setShowAddPlaylist] = useState<boolean>(false);

  const { data: playlists, error, isFetching } = usePlaylists();

  const [filteredPlaylists, setFilteredPlaylists] = useState<PlaylistDto[]>([]);

  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    if (filter === "") {
      setFilteredPlaylists(playlists ?? []);
    } else {
      let filterLowerCase = filter.toLowerCase();
      setFilteredPlaylists(
        (playlists ?? []).filter((a) =>
          a.title.toLowerCase().includes(filterLowerCase)
        )
      );
    }
  }, [playlists, filter]);

  return (
    <div>
      <div className="d-flex flex-row m-3">
        <h1>Playlists</h1>

        <input
          className="form-control my-auto mx-4"
          placeholder="Search for a playlist..."
          type="text"
          onChange={(event) => setFilter(event.currentTarget.value)}
        ></input>

        <Button
          title="New Playlist"
          variant="outline-info"
          className="ml-auto mb-auto mt-auto mr-2"
          onClick={() => setShowAddPlaylist(true)}
        >
          <FontAwesomeIcon icon="plus" size="lg" />
        </Button>
      </div>

      {error ? (
        <Alert variant="danger">An error occurred while fetching data!</Alert>
      ) : playlists ? (
        <Container fluid>
          <Row>
            {filteredPlaylists.map((a) => (
              <Col xs={6} sm={4} md={3} xl={2} key={a.id}>
                <CardComponent
                  title={a.title}
                  pictureGuid={a.coverGuid}
                  relativeLink={"playlists/" + a.id}
                  toInvalidate="playlists"
                ></CardComponent>
              </Col>
            ))}
          </Row>
        </Container>
      ) : isFetching ? (
        <Spinner animation="grow" variant="info" />
      ) : (
        <div></div>
      )}

      <NewPlaylistComponent
        show={showAddPlaylist}
        setShow={setShowAddPlaylist}
        isEdited={false}
        editedPlaylist={new PlaylistDto(0, "", null, null)}
      ></NewPlaylistComponent>
    </div>
  );
}

export default PlaylistsPage;
