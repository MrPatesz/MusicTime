import SongsPageSongComponent from "../Components/SongComponents/SongsPageSongComponent";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { setQueue } from "../redux/queue";
import { Container, Row, Col, ButtonGroup } from "react-bootstrap";
import useDetailedSongs from "../Hooks/Queries/SongQueries/useDetailedSongs";
import Alert from "react-bootstrap/Alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import DetailedSongDto from "../Models/DetailedSongDto";

function SongsPage() {
  const dispatch = useDispatch();

  const { data: songs, error, isFetching } = useDetailedSongs();

  const [filteredSongs, setFilteredSongs] = useState<DetailedSongDto[]>([]);

  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    if (filter === "") {
      setFilteredSongs(songs ?? []);
    } else {
      let filterLowerCase = filter.toLowerCase();
      setFilteredSongs(
        (songs ?? []).filter(
          (s) =>
            s.songTitle.toLowerCase().includes(filterLowerCase) ||
            s.artistName.toLowerCase().includes(filterLowerCase) ||
            s.albumTitle.toLowerCase().includes(filterLowerCase)
        )
      );
    }
  }, [songs, filter]);

  return (
    <div>
      <div className="d-flex flex-row m-3">
        <h1>Songs</h1>

        <input
          className="form-control my-auto mx-4"
          placeholder="Search for a song, album or artist..."
          type="text"
          onChange={(event) => setFilter(event.currentTarget.value)}
        ></input>

        <Button
          title="Add to Queue"
          variant="outline-info"
          className="ml-auto mt-auto mb-auto mr-2"
          onClick={() => dispatch(setQueue(filteredSongs ?? []))}
        >
          <FontAwesomeIcon icon="play" size="lg" />
        </Button>
      </div>

      <div className="d-flex flex-row">
        <Container fluid>
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

        <ButtonGroup className="ml-auto invisible mr-4">
          <Button variant="outline-info" className="mr-1">
            <FontAwesomeIcon icon="plus" size="lg" />
          </Button>
          <Button variant="outline-danger">
            <FontAwesomeIcon icon="trash-alt" size="lg" />
          </Button>
        </ButtonGroup>
      </div>

      {error ? (
        <Alert variant="danger">An error occurred while fetching data!</Alert>
      ) : songs ? (
        <ul className="no-bullets">
          {filteredSongs.map((s, i) => (
            <li key={s.songId} className={i % 2 !== 0 ? "bg-dark" : ""}>
              <SongsPageSongComponent
                detailedSongDto={s}
              ></SongsPageSongComponent>
            </li>
          ))}
        </ul>
      ) : isFetching ? (
        <Spinner animation="grow" variant="info" />
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default SongsPage;
