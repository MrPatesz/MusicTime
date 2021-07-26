import { useState } from "react";
import ArtistDto from "../Models/ArtistDto";
import CardComponent from "../Components/CardComponent";
import { Container, Row, Col } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import NewArtistComponent from "../Components/NewArtistComponent";
import { Config } from "../config";
import useArtists from "../Hooks/useArtists";
import Alert from "react-bootstrap/Alert";

function ArtistsPage() {
  const { data: artists, error, isFetching } = useArtists();

  const apiLink = Config.apiUrl + "artists/";

  const [showAddArtist, setShowAddArtist] = useState<boolean>(false);

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

      {isFetching || error ? (
        <div>
          {isFetching ? (
            <Spinner animation="grow" variant="info" />
          ) : (
            <Alert variant="danger">
              There was an error while fetching the data!
            </Alert>
          )}
        </div>
      ) : (
        <Container fluid>
          <Row>
            {artists!.map((a) => (
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
