import { useEffect, useState } from "react";
import axios from "axios";
import ArtistDto from "../Models/ArtistDto";
import CardComponent from "../Components/CardComponent";
import { Container, Row, Col } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import AddArtistComponent from "../Components/AddArtistComponent";

function ArtistsPage() {
  const apiLink = "https://localhost:5001/api/artists/";

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

      let artistsArray: ArtistDto[] = [];

      result.data.forEach((artist: ArtistDto) => {
        artistsArray.push(
          new ArtistDto(
            artist.id,
            artist.name,
            artist.description,
            artist.pictureGuid
          )
        );
      });
      setStillLoading(false);
      setArtists(artistsArray);
    };
    fetchData();
  }, []);

  return (
    <div className="page">
      <Container fluid>
        <Row>
          <h1>Artists</h1>
          <Button
            style={{ maxHeight: "44px" }}
            variant="outline-info"
            className="ml-auto"
            onClick={() => setShowAddArtist(true)}
          >
            Add
          </Button>
        </Row>
      </Container>

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

      <AddArtistComponent
        show={showAddArtist}
        setShow={setShowAddArtist}
        isEdited={false}
        editedArtist={new ArtistDto(0, "", null, null)}
      ></AddArtistComponent>
    </div>
  );
}

export default ArtistsPage;
