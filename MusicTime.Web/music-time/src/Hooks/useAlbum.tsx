import { useQuery } from "react-query";
import axios from "axios";
import { Config } from "../config";
import AlbumDto from "../Models/AlbumDto";

function useAlbum(albumId: number) {
  const apiLink = Config.apiUrl + "albums/" + albumId;

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  };

  return useQuery<AlbumDto>(["album", albumId], () =>
    axios.get(apiLink, config).then((res) => res.data)
  );
}

export default useAlbum;
