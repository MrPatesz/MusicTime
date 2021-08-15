import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import React from "react";
import { useForm } from "react-hook-form";
import { ButtonToolbar } from "react-bootstrap";
import useRegisterUser from "../Hooks/Mutations/UserMutations/useRegisterUser";

interface Props {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<any>>;
}

type FormValues = {
  UserName: string;
  Password: string;
  ConfirmPassword: string;
};

function RegisterComponent({ show, setShow }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const registerUser = useRegisterUser(setShow);

  async function registerFunction(data: FormValues) {
    if (data.Password === data.ConfirmPassword) {
      await registerUser.mutateAsync({
        username: data.UserName,
        password: data.Password,
      });
    } else {
      alert("Password does not match!");
    }
  }

  return (
    <div>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
        animation={false}
      >
        <Modal.Header>
          <Modal.Title>Registration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit((data) => registerFunction(data))}>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                {...register("UserName", { required: true, maxLength: 50 })}
              />
              {errors.UserName?.type === "required" && "Username is required"}
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                {...register("Password", { required: true })}
              />
              {errors.Password?.type === "required" && "Password is required"}
            </Form.Group>

            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                {...register("ConfirmPassword", { required: true })}
              />
              {errors.ConfirmPassword?.type === "required" &&
                "Password confirmation is required"}
            </Form.Group>

            <ButtonToolbar className="justify-content-between">
              <Button
                variant="outline-secondary"
                onClick={() => setShow(false)}
              >
                Cancel
              </Button>
              <Button variant="outline-info" type="submit">
                Confirm
              </Button>
            </ButtonToolbar>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default RegisterComponent;
