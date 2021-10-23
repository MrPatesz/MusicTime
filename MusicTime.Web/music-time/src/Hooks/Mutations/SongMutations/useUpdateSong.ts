import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { Config } from "../../../config";
import SongDto from "../../../Models/SongDto";

interface MutationVariables {
  id: number;
  title: string;
  url: string;
  albumId: number;
  albumIndex: number;
}

function useUpdateSong() {
  const apiLink = Config.apiUrl + "songs/";
  const authToken = localStorage.getItem("authToken");

  const queryClient = useQueryClient();

  return useMutation(
    (variables: MutationVariables) =>
      axios
        .put<SongDto>(
          apiLink + variables.id,
          {
            Id: variables.id,
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
        queryClient.invalidateQueries("albumsSongs");
      },
    }
  );
}

export default useUpdateSong;
