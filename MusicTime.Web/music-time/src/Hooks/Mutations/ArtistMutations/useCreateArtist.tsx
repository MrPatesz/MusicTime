import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { Config } from "../../../config";
import ArtistDto from "../../../Models/ArtistDto";

interface MutationVariables {
  name: string;
  description: string;
}

function useCreateArtist() {
  const apiLink = Config.apiUrl + "artists/";
  const authToken = localStorage.getItem("authToken");

  const queryClient = useQueryClient();

  return useMutation(
    (variables: MutationVariables) =>
      axios
        .post<ArtistDto>(
          apiLink,
          {
            Name: variables.name,
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
        queryClient.invalidateQueries("artists");
      },
    }
  );
}

export default useCreateArtist;
