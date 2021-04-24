import SongComponent from "../Components/SongComponent";
import { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Image from "react-bootstrap/Image";
import Spinner from "react-bootstrap/Spinner";
import PlaylistDto from "../Models/PlaylistDto";
import AddSongToPlaylistComponent from "../Components/AddSongToPlaylistComponent";
import DetailedSongDto from "../Models/DetailedSongDto";
import SongDto from "../Models/SongDto";
import axios from "axios";

function PlaylistDetailsPage() {
  const apiLink = "https://localhost:5001/api/";

  let id = useRouteMatch("/playlists/:id").params.id;

  const [playlist, setPlaylist] = useState<PlaylistDto>(
    new PlaylistDto(0, "", null, null)
  );
  const [playlistIsLoading, setPlaylistIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      const result = await axios.get(apiLink + "playlists/" + id, config);

      setPlaylist(result.data);
      setPlaylistIsLoading(false);
    };
    fetchData();
  }, [id]);

  const [songs, setSongs] = useState<DetailedSongDto[]>([]);
  const [songsStillLoading, setSongsStillLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      const result = await axios.get(apiLink + "playlists/" + id + "/songs", config);

      setSongs(result.data);
      setSongsStillLoading(false);
    };
    fetchData();
  }, [apiLink, id]);

  //const [showEditPlaylist, setShowEditPlaylist] = useState<boolean>(false);

  return (
    <div className="page">
      <div>
        {playlistIsLoading ? (
          <Spinner animation="grow" variant="info" />
        ) : (
          <div className="d-flex flex-row">
            <Image
              src={
                playlist.coverGuid === null
                  ? "/placeholder.png"
                  : playlist.coverGuid
              }
              rounded
              style={{ minWidth: "11rem", maxWidth: "14rem" }}
              className="mt-2 mb-2 mr-4"
            />
            <div className="d-flex flex-column">
              <h1>{playlist.title}</h1>
              <p>{playlist.description}</p>
            </div>

            <ButtonGroup className="ml-auto mt-3">
              <Button
                variant="outline-info"
                onClick={() => {} /*setShowEditPlaylist(true)*/}
                style={{ maxHeight: "3rem" }}
              >
                Edit
              </Button>
            </ButtonGroup>
          </div>
        )}
      </div>
      <div>
        <div className="d-flex flex-row mb-3 mt-2">
          <h2>Songs</h2>
          <AddSongToPlaylistComponent
            playlistId={id}
          ></AddSongToPlaylistComponent>
        </div>

        {songsStillLoading ? (
          <Spinner animation="grow" variant="info" />
        ) : (
          <ul className="no-bullets">
            {songs.map((s) => (
              <li key={s.songId}>
                <SongComponent
                  detailed={true}
                  songDto={new SongDto(0, "", "")}
                  detailedSongDto={s}
                ></SongComponent>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default PlaylistDetailsPage;
