import CardComponent from "../Components/CardComponents/CardComponent";
import { Container, Row, Col } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import useAlbums from "../Hooks/Queries/AlbumQueries/useAlbums";
import Alert from "react-bootstrap/Alert";
import { useState, useEffect } from "react";
import AlbumDto from "../Models/AlbumDto";

function AlbumsPage() {
  const { data: albums, error, isFetching } = useAlbums();

  const [filteredAlbums, setFilteredAlbums] = useState<AlbumDto[]>([]);

  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    if (filter === "") {
      setFilteredAlbums(albums ?? []);
    } else {
      let filterLowerCase = filter.toLowerCase();
      setFilteredAlbums(
        (albums ?? []).filter((a) =>
          a.title.toLowerCase().includes(filterLowerCase)
        )
      );
    }
  }, [albums, filter]);

  return (
    <div>
      <div className="d-flex flex-row my-3 mx-4">
        <h1>Albums</h1>

        <input
          className="form-control my-auto ml-4"
          placeholder="Search for an album..."
          type="text"
          onChange={(event) => setFilter(event.currentTarget.value)}
        ></input>
      </div>

      <div className="mx-2">
        {error ? (
          <Alert variant="danger">An error occurred while fetching data!</Alert>
        ) : albums ? (
          <Container fluid>
            <Row>
              {filteredAlbums.map((a) => (
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
    </div>
  );
}

export default AlbumsPage;
