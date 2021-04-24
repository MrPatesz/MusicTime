import { useEffect, useState } from "react";
import axios from "axios";
import SongDto from "../Models/SongDto";
import SongComponent from "../Components/SongComponent";
import Spinner from "react-bootstrap/Spinner";
import DetailedSongDto from "../Models/DetailedSongDto";

function SongsPage() {
  const apiLink = "https://localhost:5001/api/songs";

  const [songs, setSongs] = useState<SongDto[]>([]);
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
  }, []);

  return (
    <div className="page">
      <h1>Songs</h1>

      {stillLoading ? (
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
        </ul>
      )}
    </div>
  );
}

export default SongsPage;
