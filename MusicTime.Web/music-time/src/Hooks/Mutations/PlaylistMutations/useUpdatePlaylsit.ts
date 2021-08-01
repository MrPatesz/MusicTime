import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { Config } from "../../../config";
import PlaylistDto from "../../../Models/PlaylistDto";

interface MutationVariables {
  id: number;
  title: string;
  description: string;
}

function useUpdatePlaylist() {
  const apiLink = Config.apiUrl + "playlists/";
  const authToken = localStorage.getItem("authToken");

  const queryClient = useQueryClient();

  return useMutation(
    (variables: MutationVariables) =>
      axios
        .put<PlaylistDto>(
          apiLink + variables.id,
          {
            Id: variables.id,
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

export default useUpdatePlaylist;
