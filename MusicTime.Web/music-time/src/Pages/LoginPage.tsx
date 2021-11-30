import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { ButtonToolbar } from "react-bootstrap";
import { useForm } from "react-hook-form";
import RegisterComponent from "../Components/RegisterComponent";
import { useState } from "react";
import useLoginUser from "../Hooks/Mutations/UserMutations/useLoginUser";

interface Props {
  setLoggedIn: (value: boolean) => void;
}

type FormValues = {
  UserName: string;
  Password: string;
};

function LoginPage({ setLoggedIn }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const loginUser = useLoginUser(setLoggedIn);

  const [showRegister, setShowRegister] = useState<boolean>(false);

  function loginFunction(data: FormValues) {
    loginUser.mutate({ username: data.UserName, password: data.Password });
  }

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "35%",
        transform: "translate(-50%, -50%)",
        width: "500px",
      }}
    >
      <Form onSubmit={handleSubmit((data) => loginFunction(data))}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            maxLength={50}
            type="text"
            placeholder="Username"
            {...register("UserName", { required: true, maxLength: 50 })}
          />
          {errors.UserName?.type === "required" && (
            <div className="text-danger">Username is required</div>
          )}
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            maxLength={150}
            type="password"
            placeholder="Password"
            {...register("Password", { required: true, maxLength: 150 })}
          />
          {errors.Password?.type === "required" && (
            <div className="text-danger">Password is required</div>
          )}
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
