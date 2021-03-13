import { useEffect, useState } from "react";
import axios from "axios";
import ArtistDto from "../Models/ArtistDto";
import Spinner from "react-bootstrap/Spinner";

interface Props {
    artistId: number;
}

function ArtistDetailsPage({ artistId }: Props) {
  const apiLink = "https://localhost:5001/api/artists/" + artistId;

  const [artist, setArtist] = useState<ArtistDto>(new ArtistDto(0, "", "", ""));
  const [stillLoading, setStillLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(apiLink);

      setStillLoading(false);

      setArtist(
        new ArtistDto(
          result.data.id,
          result.data.name,
          result.data.description,
          result.data.pictureGuid
        )
      );
    };
    fetchData();
  }, [apiLink]);

  return (
    <div>
      <h1>{artist.name}</h1>
      {stillLoading ? (
        <Spinner animation="grow" variant="info" />
      ) : (
        <div>
          id:{artist.id}
        </div>
      )}
    </div>
  );
}

export default ArtistDetailsPage;
