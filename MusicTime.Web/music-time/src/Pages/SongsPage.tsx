import { useEffect, useState } from "react";
import axios from "axios";
import DetailedSongComponent from "../Components/SongComponents/DetailedSongComponent";
import Spinner from "react-bootstrap/Spinner";
import DetailedSongDto from "../Models/DetailedSongDto";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { setQueue } from "../redux/queue";
import { Config } from "../config";

function SongsPage() {
  const dispatch = useDispatch();

  const apiLink = Config.apiUrl + "songs/detailed";

  const [songs, setSongs] = useState<DetailedSongDto[]>([]);
  const [stillLoading, setStillLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      const result = await axios.get(apiLink, config);

      setSongs(result.data);
      setStillLoading(false);
    };
    fetchData();
  }, [apiLink]);

  return (
    <div className="page">
      <div className="d-flex flex-row mb-3">
        <h1>Songs</h1>
        <Button
          variant="outline-info"
          className="ml-auto mt-auto mb-auto"
          onClick={() => dispatch(setQueue(songs))}
        >
          Play
        </Button>
      </div>

      {stillLoading ? (
        <Spinner animation="grow" variant="info" />
      ) : (
        <ul className="no-bullets">
          {songs.map((s) => (
            <li key={s.songId}>
              <DetailedSongComponent
                detailedSongDto={s}
                playlistId={-1}
              ></DetailedSongComponent>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SongsPage;
