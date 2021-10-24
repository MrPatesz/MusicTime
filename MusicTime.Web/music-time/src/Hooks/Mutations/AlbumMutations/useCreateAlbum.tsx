import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { Config } from "../../../config";
import AlbumDto from "../../../Models/AlbumDto";

interface MutationVariables {
  artistId: number;
  title: string;
  description: string;
  genre: string;
  releaseYear: number | null;
}

function useCreateAlbum(toInvalidate: string | undefined) {
  const apiLink = Config.apiUrl + "albums/";
  const authToken = localStorage.getItem("authToken");

  const queryClient = useQueryClient();

  return useMutation(
    (variables: MutationVariables) =>
      axios
        .post<AlbumDto>(
          apiLink,
          {
            Title: variables.title,
            Description: variables.description,
            Genre: variables.genre,
            ReleaseYear: variables.releaseYear,
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              artistId: variables.artistId,
            },
          }
        )
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(toInvalidate);
      },
    }
  );
}

export default useCreateAlbum;
