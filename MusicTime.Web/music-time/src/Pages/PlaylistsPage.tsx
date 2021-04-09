import { useEffect, useState } from "react";
import CardComponent from "../Components/CardComponent";
import { Container, Row, Col } from "react-bootstrap";
import PlaylistDto from "../Models/PlaylistDto";

function PlaylistsPage() {
  const apiLink = "https://localhost:5001/api/albums/";

  const [playlists, setPlaylists] = useState<PlaylistDto[]>([]);

  useEffect(() => {
    const fetchData = () => {
      let playlistArray: PlaylistDto[] = [];
      for (let i = 0; i < 10; i++) {
        playlistArray.push(new PlaylistDto(i, "title" + i, null, null));
      }
      setPlaylists(playlistArray);
    };
    fetchData();
  }, []);

  return (
    <div className="page">
      <h1>Playlists</h1>

      <Container fluid>
        <Row>
          {playlists.map((a) => (
            <Col xs={6} sm={4} md={3} xl={2} key={a.id}>
              <CardComponent
                title={a.title}
                pictureGuid={a.coverGuid}
                deleteLink={apiLink}
                linkTo="playlists/"
                objectId={a.id}
              ></CardComponent>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default PlaylistsPage;
