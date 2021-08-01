import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { Config } from "../../../config";
import ArtistDto from "../../../Models/ArtistDto";

interface MutationVariables {
  id: number;
  name: string;
  description: string;
}

function useUpdateArtist() {
  const apiLink = Config.apiUrl + "artists/";
  const authToken = localStorage.getItem("authToken");

  const queryClient = useQueryClient();

  return useMutation(
    (variables: MutationVariables) =>
      axios
        .put<ArtistDto>(
          apiLink + variables.id,
          {
            Id: variables.id,
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

export default useUpdateArtist;
