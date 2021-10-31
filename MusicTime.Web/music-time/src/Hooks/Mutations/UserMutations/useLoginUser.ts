import axios from "axios";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { Config } from "../../../config";
import { clearQueue } from "../../../redux/player";

interface MutationVariables {
  username: string;
  password: string;
}

function useRegisterUser(
  setLoggedIn: React.Dispatch<React.SetStateAction<any>>
) {
  const apiLink = Config.apiUrl + "users/login";

  const dispatch = useDispatch();

  return useMutation(
    (variables: MutationVariables) =>
      axios
        .post<string>(apiLink, {
          UserName: variables.username,
          Password: variables.password,
        })
        .then((result) => {
          localStorage.setItem("authToken", String(result.data));
          localStorage.setItem("userName", variables.username);
        }),
    {
      onError: () => alert("Wrong username or password"),
      onSuccess: () => {
        dispatch(clearQueue());
        setLoggedIn(true);
      },
    }
  );
}

export default useRegisterUser;
