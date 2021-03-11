import { useEffect, useState } from "react";
import axios from "axios";
import ArtistDto from "../Models/ArtistDto";
import CardComponent from "../Components/CardComponent";
import { Container, Row, Col } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

function ArtistsPage() {
  const [artists, setArtists] = useState<ArtistDto[]>([]);
  const [stillLoading, setStillLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("https://localhost:5001/api/artists");

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
    <div>
      <h1>Artists:</h1>
      {stillLoading ? (
        <Spinner animation="grow" variant="info" />
      ) : (
        <Container fluid>
          <Row xs={2} md={3} lg={4}>
            {artists.map((a) => (
              <Col>
                <CardComponent
                  title={a.name}
                  pictureGuid={a.pictureGuid}
                ></CardComponent>
              </Col>
            ))}
            {artists.map((a) => (
              <Col>
                <CardComponent
                  title={a.name}
                  pictureGuid={a.pictureGuid}
                ></CardComponent>
              </Col>
            ))}
            {artists.map((a) => (
              <Col>
                <CardComponent
                  title={a.name}
                  pictureGuid={a.pictureGuid}
                ></CardComponent>
              </Col>
            ))}
            {artists.map((a) => (
              <Col>
                <CardComponent
                  title={a.name}
                  pictureGuid={a.pictureGuid}
                ></CardComponent>
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </div>
  );
}

export default ArtistsPage;
