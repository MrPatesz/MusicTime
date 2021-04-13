import { useEffect, useState } from "react";
import axios from "axios";
import SongDto from "../Models/SongDto";
import SongComponent from "../Components/SongComponent";
import Spinner from "react-bootstrap/Spinner";

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
              title={s.title}
              artist={null}
              album={null}
              id={s.id}
            ></SongComponent>
          </li>
        ))}
      </ul>
      )}
      
    </div>
  );
}

export default SongsPage;
