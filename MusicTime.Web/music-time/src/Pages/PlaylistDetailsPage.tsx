import SongComponent from "../Components/SongComponent";
import SongDto from "../Models/SongDto";
import { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Image from "react-bootstrap/Image";
import Spinner from "react-bootstrap/Spinner";
import PlaylistDto from "../Models/PlaylistDto";
import AddSongToPlaylistComponent from "../Components/AddSongToPlaylistComponent";

function PlaylistDetailsPage() {
  let id = useRouteMatch("/playlists/:id").params.id;

  const [playlist, setPlaylist] = useState<PlaylistDto>(
    new PlaylistDto(0, "", null, null)
  );
  const [playlistStillLoading, setPlaylistStillLoading] = useState<boolean>(
    true
  );

  useEffect(() => {
    setPlaylist(
      new PlaylistDto(0, "Favourite songs", "description comes here", null)
    );
    setPlaylistStillLoading(false);
  }, []);

  const [songs, setSongs] = useState<SongDto[]>([]);
  const [songsStillLoading, setSongsStillLoading] = useState<boolean>(true);

  useEffect(() => {
    const mockedData = () => {
      let songArray: SongDto[] = [];
      for (let i = 0; i < 10; i++) {
        songArray.push(new SongDto(i, "title" + i));
      }
      setSongs(songArray);
      setSongsStillLoading(false);
    };
    mockedData();
  }, []);

  //const [showEditPlaylist, setShowEditPlaylist] = useState<boolean>(false);

  return (
    <div className="page">
      <div>
        {playlistStillLoading ? (
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
                onClick={() => {}/*setShowEditPlaylist(true)*/}
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
              <li key={s.id}>
                <SongComponent
                  title={s.title}
                  artist={"artistName" + s.id}
                  album={"albumTitle" + s.id}
                  id={s.id}
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
