import { useState } from "react";
import ArtistDto from "../Models/ArtistDto";
import CardComponent from "../Components/CardComponent";
import { Container, Row, Col } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import NewArtistComponent from "../Components/NewArtistComponent";
import useArtists from "../Hooks/Queries/ArtistQueries/useArtists";
import Alert from "react-bootstrap/Alert";

function HomePage() {
  const [showAddArtist, setShowAddArtist] = useState<boolean>(false);

  const { data: artists, error, isFetching } = useArtists();

  // TODO("last played")

  return (
    <div>
      <h1 className="d-flex flex-row m-3 mb-4">History</h1>

      {error ? (
        <Alert variant="danger">An error occurred while fetching data!</Alert>
      ) : artists ? (
        <Container fluid>
          <Row>
            {artists.map((a) => (
              <Col xs={6} sm={4} md={3} xl={2} key={a.id}>
                <CardComponent
                  title={a.name}
                  pictureGuid={a.pictureGuid}
                  relativeLink={"artists/" + a.id}
                  toInvalidate="artists"
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

      <NewArtistComponent
        show={showAddArtist}
        setShow={setShowAddArtist}
        isEdited={false}
        editedArtist={new ArtistDto(0, "", null, null)}
      ></NewArtistComponent>
    </div>
  );
}

export default HomePage;
