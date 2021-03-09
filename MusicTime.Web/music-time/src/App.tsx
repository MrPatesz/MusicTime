import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import SongDto from './Models';

function App() {
  const [songs, setSongs] = useState<SongDto[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("https://localhost:5001/api/songs");

      let songsArray: SongDto[] = [];

      result.data.forEach((song: SongDto) => {
        songsArray.push(new SongDto(song.id, song.title));
      });
      setSongs(songsArray);
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <ul>
          {songs.map((s) => (
            <li key={s.id}>{s.title}</li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
