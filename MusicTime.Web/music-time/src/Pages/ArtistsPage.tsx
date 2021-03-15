import { useEffect, useState } from "react";
import axios from "axios";
import ArtistDto from "../Models/ArtistDto";
import CardComponent from "../Components/CardComponent";
import { Container, Row, Col } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
//import ModalDialog from 'react-bootstrap/ModalDialog';

function ArtistsPage() {
  const apiLink = "https://localhost:5001/api/artists/";

  const [artists, setArtists] = useState<ArtistDto[]>([]);
  const [stillLoading, setStillLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(apiLink);

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

      // FOR TESTING
      artistsArray = artistsArray.concat(artistsArray);
      artistsArray = artistsArray.concat(artistsArray);
      // FOR TESTING

      setArtists(artistsArray);
    };
    fetchData();
  }, []);

  function deleteFunction(id: number) {
    var result = window.confirm("Are you sure you want to delete this artist?");
    if (result) {
      const deleteCall = async () => {
        await axios.delete(apiLink + id);
      };
      deleteCall();
    }
  }

  return (
    <div>
      <h1>Artists</h1>
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
                  deleteFunction={deleteFunction}
                  linkTo="artists/"
                  objectId={a.id}
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
