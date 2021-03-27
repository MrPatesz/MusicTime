import { useEffect, useState } from "react";
import axios from "axios";
import AlbumDto from "../Models/AlbumDto";
import CardComponent from "../Components/CardComponent";
import { Container, Row, Col } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import AddAlbumComponent from "../Components/AddAlbumComponent";

function AlbumsPage() {
  const apiLink = "https://localhost:5001/api/albums/";

  const [albums, setAlbums] = useState<AlbumDto[]>([]);
  const [stillLoading, setStillLoading] = useState<boolean>(true);

  const [showAddAlbum, setShowAddAlbum] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      const result = await axios.get(apiLink, config);

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
            onClick={() => setShowAddAlbum(true)}
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

      <AddAlbumComponent
        show={showAddAlbum}
        setShow={setShowAddAlbum}
      ></AddAlbumComponent>
    </div>
  );
}

export default AlbumsPage;
