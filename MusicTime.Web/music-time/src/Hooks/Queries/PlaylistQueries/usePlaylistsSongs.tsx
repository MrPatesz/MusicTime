import { useQuery } from "react-query";
import axios from "axios";
import { Config } from "../../../config";
import DetailedSongDto from "../../../Models/DetailedSongDto";

function usePlaylistsSongs(playlistId: number) {
  const apiLink = Config.apiUrl + "playlists/" + playlistId + "/songs";

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  };

  return useQuery<DetailedSongDto[]>(["playlistsSongs", playlistId], () =>
    axios.get(apiLink, config).then((res) => res.data)
  );
}

export default usePlaylistsSongs;
