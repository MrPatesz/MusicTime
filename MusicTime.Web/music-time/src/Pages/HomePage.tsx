import { useState } from "react";
import ArtistDto from "../Models/ArtistDto";
import ArtistHistoryCardComponent from "../Components/CardComponents/HistoryCardComponents/ArtistHistoryCardComponent";
import AlbumHistoryCardComponent from "../Components/CardComponents/HistoryCardComponents/AlbumHistoryCardComponent";
import PlaylistHistoryCardComponent from "../Components/CardComponents/HistoryCardComponents/PlaylistHistoryCardComponent";
import { Container, Row, Col, Button } from "react-bootstrap";
import NewArtistComponent from "../Components/NewArtistComponent";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { clearHistory } from "../redux/player";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function HomePage() {
  const [showAddArtist, setShowAddArtist] = useState<boolean>(false);

  const dispatch = useDispatch();
  const history = useSelector((state: RootState) => state.player.history);

  return (
    <div>
      <div className="d-flex flex-row my-3 mx-4">
        <h1>History</h1>
        <Button
          className="my-auto ml-auto"
          onClick={() => dispatch(clearHistory())}
          variant="outline-warning"
          title="Clear history"
        >
          <FontAwesomeIcon icon="trash-alt" size="lg" />
        </Button>
      </div>

      <div className="mx-2">
        <Container fluid>
          <Row>
            {history.map((h) => (
              <Col xs={6} sm={4} md={3} xl={2} key={h.type + h.id}>
                {h.type === "artist" ? (
                  <ArtistHistoryCardComponent
                    id={h.id}
                  ></ArtistHistoryCardComponent>
                ) : h.type === "album" ? (
                  <AlbumHistoryCardComponent
                    id={h.id}
                  ></AlbumHistoryCardComponent>
                ) : h.type === "playlist" ? (
                  <PlaylistHistoryCardComponent
                    id={h.id}
                  ></PlaylistHistoryCardComponent>
                ) : (
                  <div></div>
                )}
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      <NewArtistComponent
        show={showAddArtist}
        setShow={setShowAddArtist}
        isEdited={false}
        editedArtist={new ArtistDto(0, "", null, null)}
      ></NewArtistComponent>
    </div>
  );
}

export default HomePage;
