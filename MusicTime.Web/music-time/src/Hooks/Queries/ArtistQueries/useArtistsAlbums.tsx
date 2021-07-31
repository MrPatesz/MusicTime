import { useQuery } from "react-query";
import axios from "axios";
import { Config } from "../../../config";
import AlbumDto from "../../../Models/AlbumDto";

function useArtistsAlbums(artistId: number) {
  const apiLink = Config.apiUrl + "artists/" + artistId + "/albums";

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  };

  return useQuery<AlbumDto[]>(["artistsAlbums", artistId], () =>
    axios.get(apiLink, config).then((res) => res.data)
  );
}

export default useArtistsAlbums;
