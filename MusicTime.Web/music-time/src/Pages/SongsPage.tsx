import SongsPageSongComponent from "../Components/SongComponents/SongsPageSongComponent";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { setQueue } from "../redux/player";
import { Container, Row, Col } from "react-bootstrap";
import useDetailedSongs from "../Hooks/Queries/SongQueries/useDetailedSongs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import DetailedSongDto from "../Models/DetailedSongDto";
import QuickNewSongComponent from "../Components/SongComponents/QuickNewSongComponent";
import QueryComponent from "../Components/QueryComponent";

function SongsPage() {
  const dispatch = useDispatch();

  const { data: songs, error, isFetching } = useDetailedSongs();

  const [filteredSongs, setFilteredSongs] = useState<DetailedSongDto[]>([]);

  const [filter, setFilter] = useState<string>("");

  const [showAdd, setShowAdd] = useState<boolean>(false);

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
      <div className="d-flex flex-row my-3 mx-4">
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
          className="ml-auto mt-auto mb-auto"
          onClick={() => dispatch(setQueue(filteredSongs ?? []))}
        >
          <FontAwesomeIcon icon="play" size="lg" />
        </Button>
      </div>

      <div className="d-flex flex-row ml-2 mr-4 mb-2">
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

        <Button className="ml-auto invisible mr-1" variant="outline-danger">
          <FontAwesomeIcon icon="trash-alt" size="lg" />
        </Button>
        <Button
          onClick={() => setShowAdd(true)}
          disabled={showAdd}
          variant="outline-info"
          title="New song"
        >
          <FontAwesomeIcon icon="plus" size="lg" />
        </Button>
      </div>

      <div className="overflow-auto">
        <QueryComponent
        isFetching={isFetching}
        error={error}
        data={songs}
        ChildJSX={() => (
          <ul className="no-bullets">
            <QuickNewSongComponent
              show={showAdd}
              setShow={setShowAdd}
            ></QuickNewSongComponent>
            {filteredSongs.map((s, i) => (
              <li key={s.songId} className={i % 2 !== 0 ? "bg-dark" : ""}>
                <SongsPageSongComponent
                  detailedSongDto={s}
                ></SongsPageSongComponent>
              </li>
            ))}
          </ul>
        )}></QueryComponent>
      </div>
      
    </div>
  );
}

export default SongsPage;
