import { useEffect, useState } from "react";
import axios from "axios";
import AlbumDto from "../Models/AlbumDto";
import CardComponent from "../Components/CardComponent";
import { Container, Row, Col } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { Config } from "../config";

function AlbumsPage() {
  const apiLink = Config.apiUrl + "albums/";

  const [albums, setAlbums] = useState<AlbumDto[]>([]);
  const [stillLoading, setStillLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      const result = await axios.get(apiLink, config);

      setAlbums(result.data);
      setStillLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="page">
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
                  deleteLink={apiLink}
                  linkTo="albums/"
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

export default AlbumsPage;
