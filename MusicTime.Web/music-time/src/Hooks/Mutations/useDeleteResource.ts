import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { Config } from "../../config";

interface Props {
  relativeLink: string;
  toInvalidate: string;
}

function useDeleteSong({ relativeLink, toInvalidate }: Props) {
  if (relativeLink[0] === "/") {
    relativeLink = relativeLink.slice(1);
    console.log(relativeLink);
  }

  const apiLink = Config.apiUrl + relativeLink;

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  };

  const queryClient = useQueryClient();

  return useMutation(() => axios.delete(apiLink, config), {
    onSuccess: () => {
      queryClient.invalidateQueries(toInvalidate);
    },
  });
}

export default useDeleteSong;
