import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { Config } from "../../../config";
import AlbumDto from "../../../Models/AlbumDto";

interface MutationVariables {
  id: number;
  title: string;
  description: string;
  genre: string;
  releaseYear: number;
}

function useUpdateAlbum() {
  const apiLink = Config.apiUrl + "albums/";
  const authToken = localStorage.getItem("authToken");

  const queryClient = useQueryClient();

  return useMutation(
    (variables: MutationVariables) =>
      axios
        .put<AlbumDto>(
          apiLink + variables.id,
          {
            Id: variables.id,
            Title: variables.title,
            Description: variables.description,
            Genre: variables.genre,
            ReleaseYear: variables.releaseYear,
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        )
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("albums");
      },
    }
  );
}

export default useUpdateAlbum;
