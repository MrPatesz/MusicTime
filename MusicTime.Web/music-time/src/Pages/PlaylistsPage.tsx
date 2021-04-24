import { useEffect, useState } from "react";
import CardComponent from "../Components/CardComponent";
import { Container, Row, Col } from "react-bootstrap";
import PlaylistDto from "../Models/PlaylistDto";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import NewPlaylistComponent from "../Components/NewPlaylistComponent";

function PlaylistsPage() {
  const apiLink = "https://localhost:5001/api/playlists/";

  const [playlists, setPlaylists] = useState<PlaylistDto[]>([]);
  const [stillLoading, setStillLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      const result = await axios.get(apiLink, config);

      setPlaylists(result.data);
      setStillLoading(false);
    };
    fetchData();
  }, []);

  const [showAddPlaylist, setShowAddPlaylist] = useState<boolean>(false);

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

      {stillLoading ? (
        <Spinner animation="grow" variant="info" />
      ) : (
        <Container fluid>
          <Row>
            {playlists.map((a) => (
              <Col xs={6} sm={4} md={3} xl={2} key={a.id}>
                <CardComponent
                  title={a.title}
                  pictureGuid={a.coverGuid}
                  deleteLink={apiLink}
                  linkTo="playlists/"
                  objectId={a.id}
                ></CardComponent>
              </Col>
            ))}
          </Row>
        </Container>
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
