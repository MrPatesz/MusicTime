import CardComponent from "../Components/CardComponent";
import { Container, Row, Col } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import useAlbums from "../Hooks/Queries/AlbumQueries/useAlbums";
import Alert from "react-bootstrap/Alert";

function AlbumsPage() {
  const { data: albums, error, isFetching } = useAlbums();

  return (
    <div className="page">
      <h1>Albums</h1>

      {error ? (
        <Alert variant="danger">An error occurred while fetching data!</Alert>
      ) : albums ? (
        <Container fluid>
          <Row>
            {albums.map((a) => (
              <Col xs={6} sm={4} md={3} xl={2} key={a.id}>
                <CardComponent
                  title={a.title}
                  pictureGuid={a.coverGuid}
                  relativeLink={"albums/" + a.id}
                  toInvalidate="albums"
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
  );
}

export default AlbumsPage;
