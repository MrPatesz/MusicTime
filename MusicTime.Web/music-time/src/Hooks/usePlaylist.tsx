import { useQuery } from "react-query";
import axios from "axios";
import { Config } from "../config";
import PlaylistDto from "../Models/PlaylistDto";

function usePlaylist(playlistId: number) {
  const apiLink = Config.apiUrl + "playlists/" + playlistId;

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  };

  return useQuery<PlaylistDto>(["playlists", playlistId], () =>
    axios.get(apiLink, config).then((res) => res.data)
  );
}

export default usePlaylist;
