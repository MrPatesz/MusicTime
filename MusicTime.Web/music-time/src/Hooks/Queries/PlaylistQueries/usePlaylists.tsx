import { useQuery } from "react-query";
import axios from "axios";
import { Config } from "../../../config";
import PlaylistDto from "../../../Models/PlaylistDto";

function usePlaylists() {
  const apiLink = Config.apiUrl + "playlists/";

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  };

  return useQuery<PlaylistDto[]>("playlists", () =>
    axios.get(apiLink, config).then((res) => res.data)
  );
}

export default usePlaylists;
