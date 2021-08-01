import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { Config } from "../../../config";
import PlaylistDto from "../../../Models/PlaylistDto";

interface MutationVariables {
  title: string;
  description: string;
}

function useCreatePlaylist() {
  const apiLink = Config.apiUrl + "playlists/";
  const authToken = localStorage.getItem("authToken");

  const queryClient = useQueryClient();

  return useMutation(
    (variables: MutationVariables) =>
      axios
        .post<PlaylistDto>(
          apiLink,
          {
            Title: variables.title,
            Description: variables.description,
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
        queryClient.invalidateQueries("playlists");
      },
    }
  );
}

export default useCreatePlaylist;
