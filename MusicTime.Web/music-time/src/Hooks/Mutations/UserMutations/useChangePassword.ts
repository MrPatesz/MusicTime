import axios from "axios";
import { useMutation } from "react-query";
import { Config } from "../../../config";

interface MutationVariables {
  username: string;
  currentPassword: string;
  newPassword: string;
}

function useChangePassword() {
  const apiLink = Config.apiUrl + "users/change/password";

  return useMutation(
    (variables: MutationVariables) =>
      axios.post(apiLink, {
        UserName: variables.username,
        CurrentPassword: variables.currentPassword,
        NewPassword: variables.newPassword
      }),
    {
      onError: () => alert("Wrong password"),
      onSuccess: () => {
        alert("Successfully changed password");
      },
    }
  );
}

export default useChangePassword;
