import { useEffect, useState } from "react";
import axios from "axios";
import ArtistDto from "../Models/ArtistDto";
import CardComponent from "../Components/CardComponent";
import { Container, Row, Col } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import NewArtistComponent from "../Components/NewArtistComponent";
import { Config } from "../config";

function ArtistsPage() {
  const apiLink = Config.apiUrl + "artists/";

  const [artists, setArtists] = useState<ArtistDto[]>([]);
  const [stillLoading, setStillLoading] = useState<boolean>(true);

  const [showAddArtist, setShowAddArtist] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      const result = await axios.get(apiLink, config);

      setArtists(result.data);
      setStillLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="page">
      <div className="d-flex flex-row">
        <h1>Artists</h1>
        <Button
          variant="outline-info"
          className="ml-auto mb-auto mt-auto"
          onClick={() => setShowAddArtist(true)}
        >
          New
        </Button>
      </div>

      {stillLoading ? (
        <Spinner animation="grow" variant="info" />
      ) : (
        <Container fluid>
          <Row>
            {artists.map((a) => (
              <Col xs={6} sm={4} md={3} xl={2} key={a.id}>
                <CardComponent
                  title={a.name}
                  pictureGuid={a.pictureGuid}
                  deleteLink={apiLink}
                  linkTo="artists/"
                  objectId={a.id}
                ></CardComponent>
              </Col>
            ))}
          </Row>
        </Container>
      )}

      <NewArtistComponent
        show={showAddArtist}
        setShow={setShowAddArtist}
        isEdited={false}
        editedArtist={new ArtistDto(0, "", null, null)}
      ></NewArtistComponent>
    </div>
  );
}

export default ArtistsPage;
