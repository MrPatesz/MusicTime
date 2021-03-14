import { useEffect, useState } from "react";
import axios from "axios";
import AlbumDto from "../Models/AlbumDto";
import Spinner from "react-bootstrap/Spinner";
import SongDto from "../Models/SongDto";

interface Props {
  albumId: number;
}

function AlbumDetailsPage({ albumId }: Props) {
  const apiLink = "https://localhost:5001/api/albums/" + albumId;

  const [album, setAlbum] = useState<AlbumDto>(
    new AlbumDto(0, "", "", "", 0, "")
  );
  const [albumStillLoading, setAlbumStillLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(apiLink);

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
      const result = await axios.get("https://localhost:5001/api/songs");

      let songsArray: SongDto[] = [];

      result.data.forEach((song: SongDto) => {
        songsArray.push(new SongDto(song.id, song.title));
      });
      setSongs(songsArray);
      setSongsStillLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div>
      <div>
        {albumStillLoading ? (
          <Spinner animation="grow" variant="info" />
        ) : (
          <div>
            <h1>{album.title}</h1>
            id:{album.id}
          </div>
        )}
      </div>
      <div>
        <h2>Songs</h2>
        {songsStillLoading ? (
          <Spinner animation="grow" variant="info" />
        ) : (
          <ul>
            {songs.map((s) => (
              <li key={s.id}>{s.title}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default AlbumDetailsPage;
