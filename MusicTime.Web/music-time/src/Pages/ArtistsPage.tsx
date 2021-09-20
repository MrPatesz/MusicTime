import { useEffect, useState } from "react";
import ArtistDto from "../Models/ArtistDto";
import CardComponent from "../Components/CardComponents/CardComponent";
import { Container, Row, Col } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import NewArtistComponent from "../Components/NewArtistComponent";
import useArtists from "../Hooks/Queries/ArtistQueries/useArtists";
import Alert from "react-bootstrap/Alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ArtistsPage() {
  const [showAddArtist, setShowAddArtist] = useState<boolean>(false);

  const { data: artists, error, isFetching } = useArtists();

  const [filteredArtists, setFilteredArtists] = useState<ArtistDto[]>([]);

  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    if (filter === "") {
      setFilteredArtists(artists ?? []);
    } else {
      let filterLowerCase = filter.toLowerCase();
      setFilteredArtists(
        (artists ?? []).filter((a) =>
          a.name.toLowerCase().includes(filterLowerCase)
        )
      );
    }
  }, [artists, filter]);

  return (
    <div>
      <div className="d-flex flex-row my-3 mx-4">
        <h1>Artists</h1>

        <input
          className="form-control my-auto mx-4"
          placeholder="Search for an artist..."
          type="text"
          onChange={(event) => setFilter(event.currentTarget.value)}
        ></input>

        <Button
          title="New artist"
          variant="outline-info"
          className="ml-auto mb-auto mt-auto"
          onClick={() => setShowAddArtist(true)}
        >
          <FontAwesomeIcon icon="plus" size="lg" />
        </Button>
      </div>

      <div className="mx-2">
        {error ? (
          <Alert variant="danger">An error occurred while fetching data!</Alert>
        ) : artists ? (
          <Container fluid>
            <Row>
              {filteredArtists.map((a) => (
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

export default ArtistsPage;
