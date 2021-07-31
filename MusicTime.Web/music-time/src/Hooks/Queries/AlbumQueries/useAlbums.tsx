import { useQuery } from "react-query";
import axios from "axios";
import { Config } from "../../../config";
import AlbumDto from "../../../Models/AlbumDto";

function useAlbums() {
  const apiLink = Config.apiUrl + "albums/";

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  };

  return useQuery<AlbumDto[]>("albums", () =>
    axios.get(apiLink, config).then((res) => res.data)
  );
}

export default useAlbums;
