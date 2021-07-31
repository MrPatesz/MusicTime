import { useQuery } from "react-query";
import axios from "axios";
import { Config } from "../../../config";
import DetailedSongDto from "../../../Models/DetailedSongDto";

function useDetailedSongs() {
  const apiLink = Config.apiUrl + "songs/detailed";

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  };

  return useQuery<DetailedSongDto[]>("detailedSongs", () =>
    axios.get(apiLink, config).then((res) => res.data)
  );
}

export default useDetailedSongs;
