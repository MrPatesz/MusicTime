import { useQuery } from "react-query";
import axios from "axios";
import { Config } from "../config";
import SongDto from "../Models/SongDto";

function useAlbumsSongs(albumId: number) {
  const apiLink = Config.apiUrl + "songs/" + albumId;

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  };

  return useQuery<SongDto[]>("songs", () =>
    axios.get(apiLink, config).then((res) => res.data)
  );
}

export default useAlbumsSongs;
