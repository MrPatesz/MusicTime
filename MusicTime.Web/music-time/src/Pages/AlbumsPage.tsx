import { useEffect, useState } from "react";
import axios from "axios";
import AlbumDto from "../Models/AlbumDto";
import CardComponent from "../Components/CardComponent";
import { Container, Row, Col } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

interface Props {
  setCurrentId: (id: number) => void;
}

function AlbumsPage({ setCurrentId }: Props) {
  const apiLink = "https://localhost:5001/api/albums/";

  const [albums, setAlbums] = useState<AlbumDto[]>([]);
  const [stillLoading, setStillLoading] = useState<boolean>(true);

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

      // FOR TESTING
      albumsArray = albumsArray.concat(albumsArray);
      albumsArray = albumsArray.concat(albumsArray);
      // FOR TESTING

      setAlbums(albumsArray);
    };
    fetchData();
  }, []);

  function deleteFunction(id: number) {
    var result = window.confirm("Are you sure you want to delete this album?");
    if (result) {
      const deleteCall = async () => {
        await axios.delete(apiLink + id);
      };
      deleteCall();
    }
  }

  return (
    <div>
      <h1>Albums</h1>
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
                  deleteFunction={deleteFunction}
                  linkTo="albums/"
                  objectId={a.id}
                  setCurrentId={setCurrentId}
                ></CardComponent>
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </div>
  );
}

export default AlbumsPage;
