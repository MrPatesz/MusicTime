import SongsPageSongComponent from "../Components/SongComponents/SongsPageSongComponent";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { setQueue } from "../redux/queue";
import { Container, Row, Col } from "react-bootstrap";
import useDetailedSongs from "../Hooks/useDetailedSongs";
import Alert from "react-bootstrap/Alert";

function SongsPage() {
  const dispatch = useDispatch();

  const { data: songs, error, isFetching } = useDetailedSongs();

  return (
    <div className="page">
      <div className="d-flex flex-row mb-3">
        <h1>Songs</h1>
        <Button
          variant="outline-info"
          className="ml-auto mt-auto mb-auto"
          onClick={() => dispatch(setQueue(songs ?? []))}
        >
          Play
        </Button>
      </div>

      <Container
        fluid
        style={{
          width: "calc(100% - 133.8px)",
          left: "-66px",
          position: "relative",
        }}
      >
        <Row>
          <Col xs={12} sm={8} lg={6}>
            <h4>Title</h4>
          </Col>

          <Col className="d-none d-sm-block" sm={4} md={3}>
            <h4>Artist</h4>
          </Col>

          <Col className="d-none d-lg-block" lg={3}>
            <h4>Album</h4>
          </Col>
        </Row>
      </Container>

      {isFetching || error ? (
        isFetching ? (
          <Spinner animation="grow" variant="info" />
        ) : (
          <Alert variant="danger">An error occurred while fetching data!</Alert>
        )
      ) : (
        <ul className="no-bullets">
          {songs!.map((s, i) => (
            <li key={s.songId} className={i % 2 !== 0 ? "bg-dark" : ""}>
              <SongsPageSongComponent
                detailedSongDto={s}
              ></SongsPageSongComponent>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SongsPage;
