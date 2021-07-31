import { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { useRouteMatch } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Image from "react-bootstrap/Image";
import AlbumSongComponent from "../Components/SongComponents/AlbumSongComponent";
import NewAlbumComponent from "../Components/NewAlbumComponent";
import NewSongComponent from "../Components/SongComponents/NewSongComponent";
import DetailedSongDto from "../Models/DetailedSongDto";
import { useDispatch } from "react-redux";
import { setQueue } from "../redux/queue";
import { Config } from "../config";
import useAlbum from "../Hooks/Queries/AlbumQueries/useAlbum";
import useAlbumsSongs from "../Hooks/Queries/AlbumQueries/useAlbumsSongs";
import Alert from "react-bootstrap/Alert";

function AlbumDetailsPage() {
  const dispatch = useDispatch();

  let id = useRouteMatch("/albums/:id").params.id;

  const {
    data: album,
    error: albumError,
    isFetching: isAlbumFetching,
  } = useAlbum(id);

  const {
    data: songs,
    error: songsError,
    isFetching: areSongsFetching,
  } = useAlbumsSongs(id);

  const [showEditAlbum, setShowEditAlbum] = useState<boolean>(false);
  const [showAddSong, setShowAddSong] = useState<boolean>(false);

  function playFunction() {
    if (!(songs && album)) return;

    let queue: DetailedSongDto[] = [];

    songs.forEach((s) =>
      queue.push(
        new DetailedSongDto(s.id, s.title, s.url, 0, "", id, album.title)
      )
    );

    dispatch(setQueue(queue));
  }

  return (
    <div className="page">
      <div>
        {albumError ? (
          <Alert variant="danger">An error occurred while fetching data!</Alert>
        ) : album ? (
          <div className="d-flex flex-row">
            <Image
              src={
                album.coverGuid === null
                  ? "/placeholder.png"
                  : Config.picturePath + album.coverGuid + ".png"
              }
              rounded
              style={{
                width: "15rem",
                height: "15rem",
              }}
              className="mb-2 mr-4"
            />
            <div className="d-flex flex-column">
              <h1>{album.title}</h1>
              <h4>{album.releaseYear}</h4>
              <h4>{album.genre}</h4>
              <div>
                <p>{album.description}</p>
              </div>
            </div>

            <ButtonGroup vertical className="ml-auto mb-auto">
              <Button
                variant="outline-info"
                onClick={() => setShowEditAlbum(true)}
                className="mb-2"
              >
                Edit
              </Button>
              <Button variant="outline-info" onClick={playFunction}>
                Play
              </Button>
            </ButtonGroup>
          </div>
        ) : isAlbumFetching ? (
          <Spinner animation="grow" variant="info" />
        ) : (
          <div></div>
        )}
      </div>
      <div>
        <div className="d-flex flex-row mb-3 mt-2">
          <h2>Songs</h2>
          <Button
            variant="outline-info"
            className="ml-auto mb-auto mt-auto"
            onClick={() => setShowAddSong(true)}
            disabled={showAddSong}
          >
            New
          </Button>
        </div>

        {songsError ? (
          <Alert variant="danger">An error occurred while fetching data!</Alert>
        ) : songs ? (
          <ul className="no-bullets">
            {songs.map((s, i) => (
              <li key={s.id} className={i % 2 !== 0 ? "bg-dark" : ""}>
                <AlbumSongComponent
                  songDto={s}
                  albumId={id}
                ></AlbumSongComponent>
              </li>
            ))}
            <NewSongComponent
              show={showAddSong}
              setShow={setShowAddSong}
              albumId={id}
            ></NewSongComponent>
          </ul>
        ) : areSongsFetching ? (
          <Spinner animation="grow" variant="info" />
        ) : (
          <div></div>
        )}
      </div>

      {album ? (
        <NewAlbumComponent
          show={showEditAlbum}
          setShow={setShowEditAlbum}
          artistId={-1}
          isEdited={true}
          editedAlbum={album}
        ></NewAlbumComponent>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default AlbumDetailsPage;
