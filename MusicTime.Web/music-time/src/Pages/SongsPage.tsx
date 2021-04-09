import { useEffect, useState } from "react";
import axios from "axios";
import SongDto from "../Models/SongDto";
import SongComponent from "../Components/SongComponent";

function SongsPage() {
  const apiLink = "https://localhost:5001/api/songs";

  const [songs, setSongs] = useState<SongDto[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      const result = await axios.get(apiLink, config);

      let songsArray: SongDto[] = [];

      result.data.forEach((song: SongDto) => {
        songsArray.push(new SongDto(song.id, song.title));
      });
      setSongs(songsArray);
    };
    fetchData();
  }, []);

  return (
    <div className="page">
      <h1>Songs</h1>
      <ul className="no-bullets">
        {songs.map((s) => (
          <li key={s.id}>
            <SongComponent title={s.title}></SongComponent>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SongsPage;
