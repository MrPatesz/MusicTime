import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { Config } from "../../config";

function useDeleteSong(toInvalidate: string) {
  const apiLink = Config.apiUrl + "songs/";

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  };

  const queryClient = useQueryClient();

  return useMutation(
    (songId: number) => axios.delete(apiLink + songId, config),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(toInvalidate);
      },
    }
  );
}

export default useDeleteSong;
