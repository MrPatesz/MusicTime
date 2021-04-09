import SongComponent from "../Components/SongComponent";
import SongDto from "../Models/SongDto";
import { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";

function PlaylistDetailsPage() {
  let id = useRouteMatch("/playlists/:id").params.id;

  const [songs, setSongs] = useState<SongDto[]>([]);

  useEffect(() => {
    const fetchData = () => {
      let songArray: SongDto[] = [];
      for (let i = 0; i < 10; i++) {
        songArray.push(new SongDto(i, "title" + i));
      }
      setSongs(songArray);
    };
    fetchData();
  }, []);

  return (
    <div className="page">
      <h1>Playlist: {id}</h1>
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

export default PlaylistDetailsPage;
