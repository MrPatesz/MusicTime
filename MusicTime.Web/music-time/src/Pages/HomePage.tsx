import { useState } from "react";
import ArtistDto from "../Models/ArtistDto";
import HistoryCardComponent from "../Components/CardComponents/HistoryCardComponent";
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
      <div className="d-flex flex-row my-3 mx-4">
        <h1>History</h1>
      </div>

      <div className="mx-2">
        {error ? (
          <Alert variant="danger">An error occurred while fetching data!</Alert>
        ) : artists ? (
          <Container fluid>
            <Row>
              {artists.map((a) => (
                <Col xs={6} sm={4} md={3} xl={2} key={a.id}>
                  <HistoryCardComponent
                    title={a.name}
                    pictureGuid={a.pictureGuid}
                    relativeLink={"artists/" + a.id}
                    toInvalidate="artists"
                  ></HistoryCardComponent>
                </Col>
              ))}
            </Row>
          </Container>
        ) : isFetching ? (
          <Spinner animation="grow" variant="info" />
        ) : (
          <div></div>
        )}
      </div>

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
