import { useQuery } from "react-query";
import axios from "axios";
import { Config } from "../../../config";
import SongDto from "../../../Models/SongDto";

function useArtistsSongs(artistId: number) {
  const apiLink = Config.apiUrl + "artists/" + artistId + "/songs";

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  };

  return useQuery<SongDto[]>(["artistsSongs", artistId], () =>
    axios.get(apiLink, config).then((res) => res.data)
  );
}

export default useArtistsSongs;
