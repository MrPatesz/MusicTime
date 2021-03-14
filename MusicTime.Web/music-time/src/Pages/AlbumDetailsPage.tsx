import { useEffect, useState } from "react";
import axios from "axios";
import AlbumDto from "../Models/AlbumDto";
import Spinner from "react-bootstrap/Spinner";

interface Props {
  albumId: number;
}

function AlbumDetailsPage({ albumId }: Props) {
  const apiLink = "https://localhost:5001/api/albums/" + albumId;

  const [album, setAlbum] = useState<AlbumDto>(
    new AlbumDto(0, "", "", "", 0, "")
  );
  const [stillLoading, setStillLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(apiLink);

      setStillLoading(false);

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
    };
    fetchData();
  }, [apiLink]);

  return (
    <div>
      {stillLoading ? (
        <Spinner animation="grow" variant="info" />
      ) : (
        <div>
          <h1>{album.title}</h1>
          id:{album.id}
        </div>
      )}
    </div>
  );
}

export default AlbumDetailsPage;
