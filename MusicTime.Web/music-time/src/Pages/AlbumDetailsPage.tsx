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
import AddAlbumComponent from "../Components/AddAlbumComponent";

function AlbumDetailsPage() {
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

      setAlbum(
        new AlbumDto(
          result.data.id,
          result.data.title,
          result.data.genre,
          result.data.description,
          result.data.releaseYear,
          result.data.coverGuid
        )
      );
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

      let songsArray: SongDto[] = [];

      result.data.forEach((song: SongDto) => {
        songsArray.push(new SongDto(song.id, song.title));
      });
      setSongs(songsArray);
      setSongsStillLoading(false);
    };
    fetchData();
  }, [apiLink]);

  const [showEditAlbum, setShowEditAlbum] = useState<boolean>(false);
  //const [showAddSong, setShowAddSong] = useState<boolean>(false);

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
              className="mt-2 mb-2 mr-4"
            />
            <div className="d-flex flex-column">
              <h1>{album.title}</h1>
              <h4>{album.releaseYear}</h4>
              <h4>{album.genre}</h4>
              <div>
                <p>{album.description}</p>
              </div>
            </div>

            <ButtonGroup className="ml-auto mt-3">
              <Button
                variant="outline-info"
                onClick={() => setShowEditAlbum(true)}
                style={{ maxHeight: "3rem" }}
              >
                Edit
              </Button>
            </ButtonGroup>
          </div>
        )}
      </div>
      <div>
        <h2>Songs</h2>
        {songsStillLoading ? (
          <Spinner animation="grow" variant="info" />
        ) : (
          <ul className="no-bullets">
            {songs.map((s) => (
              <li key={s.id}>
                <SongComponent
                  title={s.title}
                  artist={null}
                  album={null}
                ></SongComponent>
              </li>
            ))}
          </ul>
        )}
      </div>

      <AddAlbumComponent
        show={showEditAlbum}
        setShow={setShowEditAlbum}
        artistId={-1} //WTF XDDDDDDDDDDDDD
        isEdited={true}
        editedAlbum={album}
      ></AddAlbumComponent>
    </div>
  );
}

export default AlbumDetailsPage;
