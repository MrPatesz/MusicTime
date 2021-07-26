import { useQuery } from "react-query";
import axios from "axios";
import { Config } from "../config";
import ArtistDto from "../Models/ArtistDto";

function useArtists() {
  const apiLink = Config.apiUrl + "artists/";

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  };

  return useQuery<ArtistDto[]>("artists", () =>
    axios.get(apiLink, config).then((res) => res.data)
  );
}

export default useArtists;
