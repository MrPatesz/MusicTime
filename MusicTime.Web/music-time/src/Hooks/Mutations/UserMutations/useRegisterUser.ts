import axios from "axios";
import { useMutation } from "react-query";
import { Config } from "../../../config";

interface MutationVariables {
  username: string;
  password: string;
}

function useRegisterUser(setShow: React.Dispatch<React.SetStateAction<any>>) {
  const apiLink = Config.apiUrl + "users/register";

  return useMutation(
    (variables: MutationVariables) =>
      axios.post(apiLink, {
        UserName: variables.username,
        Password: variables.password,
      }),
    {
      onError: () => alert("This username is already taken"),
      onSuccess: () => {
        alert("Successfully registered");
        setShow(false);
      },
    }
  );
}

export default useRegisterUser;
