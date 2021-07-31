import { useQuery } from "react-query";
import axios from "axios";
import { Config } from "../../../config";
import ArtistDto from "../../../Models/ArtistDto";

function useArtist(artistId: number) {
  const apiLink = Config.apiUrl + "artists/" + artistId;

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  };

  return useQuery<ArtistDto>(["artists", artistId], () =>
    axios.get(apiLink, config).then((res) => res.data)
  );
}

export default useArtist;
