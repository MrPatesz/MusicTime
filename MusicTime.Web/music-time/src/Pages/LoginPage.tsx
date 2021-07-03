import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { ButtonToolbar } from "react-bootstrap";
import { Config } from "../config";
import { useForm } from "react-hook-form";
import RegisterComponent from "../Components/RegisterComponent";
import { useState } from "react";

interface Props {
  setLoggedIn: (value: boolean) => void;
}

type FormValues = {
  UserName: string;
  Password: string;
};

function LoginPage({ setLoggedIn }: Props) {
  const apiLink = Config.apiUrl + "users/";

  const { register, handleSubmit } = useForm<FormValues>();

  const [showRegister, setShowRegister] = useState<boolean>(false);

  function loginFunction(data: FormValues) {
    (async () => {
      try {
        const result = await axios({
          method: "post",
          url: apiLink + "login",
          data: data,
        });
        localStorage.setItem("authToken", String(result.data));
        setLoggedIn(true);
      } catch (err) {
        alert("Wrong username or password");
      }
    })();
  }

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "35%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Form
        style={{ width: "500px" }}
        onSubmit={handleSubmit((data) => {
          loginFunction(data);
        })}
      >
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            {...register("UserName", { required: true, maxLength: 50 })}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            {...register("Password", { required: true })}
          />
        </Form.Group>

        <ButtonToolbar className="justify-content-between">
          <Button type="submit" variant="outline-info">
            Log in
          </Button>
          <Button onClick={() => setShowRegister(true)} variant="outline-info">
            Register
          </Button>
        </ButtonToolbar>
      </Form>

      <RegisterComponent
        show={showRegister}
        setShow={setShowRegister}
      ></RegisterComponent>
    </div>
  );
}

export default LoginPage;
