import { useState } from "react";
import { useRouteMatch } from "react-router-dom";
import AlbumDto from "../Models/AlbumDto";
import DetailedSongDto from "../Models/DetailedSongDto";
import { Container, Row, Col } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Image from "react-bootstrap/Image";
import CardComponent from "../Components/CardComponents/CardComponent";
import NewAlbumComponent from "../Components/NewAlbumComponent";
import NewArtistComponent from "../Components/NewArtistComponent";
import { Config } from "../config";
import { useDispatch } from "react-redux";
import { setQueue } from "../redux/queue";
import useArtist from "../Hooks/Queries/ArtistQueries/useArtist";
import useArtistsAlbums from "../Hooks/Queries/ArtistQueries/useArtistsAlbums";
import useArtistsSongs from "../Hooks/Queries/ArtistQueries/useArtistsSongs";
import Alert from "react-bootstrap/Alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ArtistDetailsPage() {
  const dispatch = useDispatch();
  let id = useRouteMatch("/artists/:id").params.id;

  const {
    data: artist,
    error: artistError,
    isFetching: isArtistFetching,
  } = useArtist(id);

  const {
    data: albums,
    error: albumsError,
    isFetching: areAlbumsFetching,
  } = useArtistsAlbums(id);

  const { data: songs } = useArtistsSongs(id);

  const [showAddAlbum, setShowAddAlbum] = useState<boolean>(false);
  const [showEditArtist, setShowEditArtist] = useState<boolean>(false);

  async function playFunction() {
    if (!(songs && artist)) return;

    let queue: DetailedSongDto[] = [];

    songs.forEach((s) =>
      queue.push(
        new DetailedSongDto(s.id, s.title, s.url, id, artist.name, 0, "")
      )
    );

    dispatch(setQueue(queue));
  }

  return (
    <div>
      <div>
        {artistError ? (
          <Alert variant="danger">An error occurred while fetching data!</Alert>
        ) : artist ? (
          <div className="d-flex flex-row m-4">
            <Image
              src={
                artist.pictureGuid === null
                  ? "/placeholder.png"
                  : Config.picturePath + artist.pictureGuid + ".png"
              }
              rounded
              style={{
                width: "15rem",
                height: "15rem",
              }}
              className="mb-2 mr-4"
            />
            <div className="d-flex flex-column">
              <h1>{artist.name}</h1>
              <p>{artist.description}</p>
            </div>

            <ButtonGroup vertical className="ml-auto mb-auto">
              <Button
                title="Edit"
                variant="outline-info"
                onClick={() => setShowEditArtist(true)}
                className="mb-2"
              >
                <FontAwesomeIcon icon="edit" size="lg" />
              </Button>
              <Button
                title="Add to Queue"
                variant="outline-info"
                onClick={playFunction}
              >
                <FontAwesomeIcon icon="play" size="lg" />
              </Button>
            </ButtonGroup>
          </div>
        ) : isArtistFetching ? (
          <Spinner animation="grow" variant="info" />
        ) : (
          <div></div>
        )}
      </div>
      <div>
        <div className="d-flex flex-row mx-4 mb-3">
          <h2>Albums</h2>
          <Button
            title="New album"
            variant="outline-info"
            className="ml-auto mt-auto mb-auto"
            onClick={() => setShowAddAlbum(true)}
          >
            <FontAwesomeIcon icon="plus" size="lg" />
          </Button>
        </div>

        <div className="mx-2">
          {albumsError ? (
            <Alert variant="danger">
              An error occurred while fetching data!
            </Alert>
          ) : albums ? (
            <Container fluid>
              <Row>
                {albums.map((a) => (
                  <Col xs={6} sm={4} md={3} xl={2} key={a.id}>
                    <CardComponent
                      title={a.title}
                      pictureGuid={a.coverGuid}
                      relativeLink={"/albums/" + a.id}
                      toInvalidate="artistsAlbums"
                    ></CardComponent>
                  </Col>
                ))}
              </Row>
            </Container>
          ) : areAlbumsFetching ? (
            <Spinner animation="grow" variant="info" />
          ) : (
            <div></div>
          )}
        </div>
      </div>

      <NewAlbumComponent
        show={showAddAlbum}
        setShow={setShowAddAlbum}
        artistId={id}
        isEdited={false}
        editedAlbum={new AlbumDto(0, "", null, null, null, null)}
      ></NewAlbumComponent>

      {artist ? (
        <NewArtistComponent
          show={showEditArtist}
          setShow={setShowEditArtist}
          isEdited={true}
          editedArtist={artist}
        ></NewArtistComponent>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default ArtistDetailsPage;
