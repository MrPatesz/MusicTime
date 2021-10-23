import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { Config } from "../../../config";
import SongDto from "../../../Models/SongDto";

interface MutationVariables {
  albumId: number;
  title: string;
  url: string;
  albumIndex: number;
}

function useCreateAlbum() {
  const apiLink = Config.apiUrl + "songs/";
  const authToken = localStorage.getItem("authToken");

  const queryClient = useQueryClient();

  return useMutation(
    (variables: MutationVariables) =>
      axios
        .post<SongDto>(
          apiLink,
          {
            Title: variables.title,
            Url: variables.url,
            AlbumIndex: variables.albumIndex,
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              albumId: variables.albumId,
            },
          }
        )
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries();
      },
    }
  );
}

export default useCreateAlbum;
