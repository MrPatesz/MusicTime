import { useEffect, useState } from "react";
import axios from "axios";
import AlbumDto from "../Models/AlbumDto";
import CardComponent from "../Components/CardComponent";
import { Container, Row, Col } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function AlbumsPage() {
  const apiLink = "https://localhost:5001/api/albums/";

  const [albums, setAlbums] = useState<AlbumDto[]>([]);
  const [stillLoading, setStillLoading] = useState<boolean>(true);

  const [addAlbum, setAddAlbum] = useState<boolean>(false);

  const [newAlbumTitle, setNewAlbumTitle] = useState<string>("");
  const [newAlbumDescription, setNewAlbumDescription] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(apiLink);

      let albumsArray: AlbumDto[] = [];

      result.data.forEach((album: AlbumDto) => {
        albumsArray.push(
          new AlbumDto(
            album.id,
            album.title,
            album.genre,
            album.description,
            album.releaseYear,
            album.coverGuid
          )
        );
      });
      setStillLoading(false);
      setAlbums(albumsArray);
    };
    fetchData();
  }, []);

  return (
    <div className="page">
      <Container fluid>
        <Row>
          <h1>Albums</h1>
          <Button
            variant="outline-info"
            className="ml-auto"
            onClick={() => setAddAlbum(true)}
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
            {albums.map((a) => (
              <Col xs={6} sm={4} md={3} xl={2} key={a.id}>
                <CardComponent
                  title={a.title}
                  pictureGuid={a.coverGuid}
                  deleteLink={apiLink}
                  linkTo="albums/"
                  objectId={a.id}
                ></CardComponent>
              </Col>
            ))}
          </Row>
        </Container>
      )}

      <Modal
        show={addAlbum}
        onHide={() => setAddAlbum(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>New Album</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setNewAlbumTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Genre</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {}}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Year of Release</Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => {}}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setNewAlbumDescription(e.target.value)}
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
            onClick={() => setAddAlbum(false)}
          >
            Cancel
          </Button>
          <Button
            variant="outline-info"
            onClick={() => {
              if (newAlbumTitle !== "") {
                setAddAlbum(false);
                setAlbums(
                  albums.concat(
                    new AlbumDto(
                      100,
                      newAlbumTitle,
                      "genre",
                      newAlbumDescription,
                      2005,
                      null
                    )
                  )
                );
                setNewAlbumTitle("");
                setNewAlbumDescription("");
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

export default AlbumsPage;
