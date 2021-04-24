import { useEffect, useState } from "react";
import axios from "axios";
import SongDto from "../Models/SongDto";
import SongComponent from "../Components/SongComponent";
import Spinner from "react-bootstrap/Spinner";
import DetailedSongDto from "../Models/DetailedSongDto";
import Button from "react-bootstrap/Button";

interface Props {
  setUrlArray: React.Dispatch<React.SetStateAction<string[]>>;
}

function SongsPage({ setUrlArray }: Props) {
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

  function playFunction() {
    let urlArray: string[] = [];

    songs.forEach((s) => urlArray.push(s.url));

    setUrlArray(urlArray);
  }

  return (
    <div className="page">
      <div className="d-flex flex-row mb-3 mt-2">
        <h1>Songs</h1>
        <Button
          variant="outline-info"
          className="ml-auto mt-auto mb-auto"
          onClick={playFunction}
        >
          Play
        </Button>
      </div>

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
