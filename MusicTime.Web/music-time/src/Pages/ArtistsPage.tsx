import { useEffect, useState } from "react";
import axios from "axios";
import ArtistDto from "../Models/ArtistDto";
import CardComponent from "../Components/CardComponent";
import { Container, Row, Col } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function ArtistsPage() {
  const apiLink = "https://localhost:5001/api/artists/";

  const [artists, setArtists] = useState<ArtistDto[]>([]);
  const [stillLoading, setStillLoading] = useState<boolean>(true);

  const [addArtist, setAddArtist] = useState<boolean>(false);

  const [newArtistName, setNewArtistName] = useState<string>("");
  const [newArtistDescription, setNewArtistDescription] = useState<string>("");

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
            variant="outline-info"
            className="ml-auto"
            onClick={() => setAddArtist(true)}
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

      <Modal
        show={addArtist}
        onHide={() => setAddArtist(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>New Artist</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setNewArtistName(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setNewArtistDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.File name="file" label="Picture" feedbackTooltip />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={() => setAddArtist(false)}
          >
            Cancel
          </Button>
          <Button
            variant="outline-info"
            onClick={() => {
              if (newArtistName !== "") {
                setAddArtist(false);
                setArtists(
                  artists.concat(
                    new ArtistDto(
                      100,
                      newArtistName,
                      newArtistDescription,
                      null
                    )
                  )
                );
                setNewArtistName("");
                setNewArtistDescription("");
                /*send to backend, rerender list*/
              }
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ArtistsPage;
