import { useState } from "react";
import CardComponent from "../Components/CardComponent";
import { Container, Row, Col } from "react-bootstrap";
import PlaylistDto from "../Models/PlaylistDto";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import NewPlaylistComponent from "../Components/PlaylistComponents/NewPlaylistComponent";
import usePlaylists from "../Hooks/Queries/PlaylistQueries/usePlaylists";
import Alert from "react-bootstrap/Alert";

function PlaylistsPage() {
  const [showAddPlaylist, setShowAddPlaylist] = useState<boolean>(false);

  const { data: playlists, error, isFetching } = usePlaylists();

  return (
    <div className="page">
      <div className="d-flex flex-row">
        <h1>Playlists</h1>
        <Button
          variant="outline-info"
          className="ml-auto mb-auto mt-auto"
          onClick={() => setShowAddPlaylist(true)}
        >
          New
        </Button>
      </div>

      {error ? (
        <Alert variant="danger">An error occurred while fetching data!</Alert>
      ) : playlists ? (
        <Container fluid>
          <Row>
            {playlists.map((a) => (
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
