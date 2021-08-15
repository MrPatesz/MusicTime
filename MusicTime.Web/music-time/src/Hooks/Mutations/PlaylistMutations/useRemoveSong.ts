import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { Config } from "../../../config";
import SongDto from "../../../Models/SongDto";

interface MutationVariables {
  songDto: SongDto;
  playlistId: number;
}

function useCreatePlaylist() {
  const apiLink = Config.apiUrl + "playlists/";
  const authToken = localStorage.getItem("authToken");

  const queryClient = useQueryClient();

  return useMutation(
    (variables: MutationVariables) =>
      axios.post(
        apiLink + variables.playlistId + "/removeSong",
        variables.songDto,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("playlistsSongs");
      },
    }
  );
}

export default useCreatePlaylist;
