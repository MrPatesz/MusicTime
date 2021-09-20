import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { Config } from "../../../config";
import SongDto from "../../../Models/SongDto";

interface MutationVariables {
  songDto: SongDto;
  playlistId: number;
}

function useAddSong(
  setShowAdd: React.Dispatch<React.SetStateAction<any>>
) {
  const apiLink = Config.apiUrl + "playlists/";
  const authToken = localStorage.getItem("authToken");

  const queryClient = useQueryClient();

  return useMutation(
    (variables: MutationVariables) =>
      axios.post(
        apiLink + variables.playlistId + "/addSong",
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
        setShowAdd(false);
      },
      onError: () => alert("This song is already added to this playlist"),
    }
  );
}

export default useAddSong;
