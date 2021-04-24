import { useEffect, useState } from "react";
import axios from "axios";
import AlbumDto from "../Models/AlbumDto";
import Spinner from "react-bootstrap/Spinner";
import SongDto from "../Models/SongDto";
import { useRouteMatch } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Image from "react-bootstrap/Image";
import SongComponent from "../Components/SongComponent";
import NewAlbumComponent from "../Components/NewAlbumComponent";
import NewSongComponent from "../Components/NewSongComponent";
import DetailedSongDto from "../Models/DetailedSongDto";

interface Props {
  setQueue: React.Dispatch<React.SetStateAction<DetailedSongDto[]>>;
}

function AlbumDetailsPage({ setQueue }: Props) {
  let id = useRouteMatch("/albums/:id").params.id;

  const apiLink = "https://localhost:5001/api/albums/" + id;

  const [album, setAlbum] = useState<AlbumDto>(
    new AlbumDto(0, "", "", "", 0, "")
  );
  const [albumStillLoading, setAlbumStillLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      const result = await axios.get(apiLink, config);

      setAlbum(result.data);
      setAlbumStillLoading(false);
    };
    fetchData();
  }, [apiLink]);

  const [songs, setSongs] = useState<SongDto[]>([]);
  const [songsStillLoading, setSongsStillLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      const result = await axios.get(apiLink + "/songs", config);

      setSongs(result.data);
      setSongsStillLoading(false);
    };
    fetchData();
  }, [apiLink]);

  const [showEditAlbum, setShowEditAlbum] = useState<boolean>(false);
  const [showAddSong, setShowAddSong] = useState<boolean>(false);

  function playFunction() {
    let queue: DetailedSongDto[] = [];

    songs.forEach((s) => queue.push(new DetailedSongDto(s.id, s.title, s.url, 0, "", id, album.title)));

    setQueue(queue);
  }

  return (
    <div className="page">
      <div>
        {albumStillLoading ? (
          <Spinner animation="grow" variant="info" />
        ) : (
          <div className="d-flex flex-row">
            <Image
              src={
                album.coverGuid === null ? "/placeholder.png" : album.coverGuid
              }
              rounded
              style={{ minWidth: "11rem", maxWidth: "14rem" }}
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

        {songsStillLoading ? (
          <Spinner animation="grow" variant="info" />
        ) : (
          <ul className="no-bullets">
            {songs.map((s) => (
              <li key={s.id}>
                <SongComponent
                  detailed={false}
                  songDto={s}
                  detailedSongDto={new DetailedSongDto(0, "", "", 0, "", 0, "")}
                  playlistId={0}
                ></SongComponent>
              </li>
            ))}
            <NewSongComponent
              show={showAddSong}
              setShow={setShowAddSong}
              albumId={id}
            ></NewSongComponent>
          </ul>
        )}
      </div>

      <NewAlbumComponent
        show={showEditAlbum}
        setShow={setShowEditAlbum}
        artistId={-1}
        isEdited={true}
        editedAlbum={album}
      ></NewAlbumComponent>
    </div>
  );
}

export default AlbumDetailsPage;
