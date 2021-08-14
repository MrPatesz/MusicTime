import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { Config } from "../../../config";

interface MutationVariables {
  id: number;
  picture: FormData;
}

interface Props {
  relativeLink: string;
  toInvalidate: string;
}

function useUploadPicture({ relativeLink, toInvalidate }: Props) {
  const apiLink = Config.apiUrl + "pictures/";
  const authToken = localStorage.getItem("authToken");

  const queryClient = useQueryClient();

  return useMutation(
    (variables: MutationVariables) =>
      axios
        .put<string>(
          apiLink + relativeLink + "/" + variables.id,
          variables.picture,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
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

export default useUploadPicture;
