import { useEffect, useState } from "react";
import axios from "axios";
import ArtistDto from "../Models/ArtistDto";
import CardComponent from "../Components/CardComponent";

function ArtistsPage() {
  const [artists, setArtists] = useState<ArtistDto[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("https://localhost:5001/api/artists");

      let artistsArray: ArtistDto[] = [];

      result.data.forEach((artist: ArtistDto) => {
        artistsArray.push(
          new ArtistDto(
            artist.id,
            artist.name,
            artist.description,
            artist.pictureGuid
          )
        );
      });
      setArtists(artistsArray);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Artists:</h1>
      {artists.map((a) => (
        <CardComponent title={a.name} pictureGuid={a.pictureGuid}></CardComponent>
      ))}
    </div>
  );
}

export default ArtistsPage;
