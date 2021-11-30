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
              maxLength={50}
              type="text"
              {...register("UserName", { required: true, maxLength: 50 })}
            />
            {errors.UserName?.type === "required" && (
              <div className="text-danger">Username is required</div>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              maxLength={256}
              type="password"
              {...register("Password", { required: true, maxLength: 256 })}
            />
            {errors.Password?.type === "required" && (
              <div className="text-danger">Password is required</div>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              maxLength={256}
              type="password"
              {...register("ConfirmPassword", {
                required: true,
                maxLength: 256,
              })}
            />
            {errors.ConfirmPassword?.type === "required" && (
              <div className="text-danger">
                Password confirmation is required
              </div>
            )}
          </Form.Group>

          <ButtonToolbar className="justify-content-between">
            <Button variant="outline-secondary" onClick={() => setShow(false)}>
              Cancel
            </Button>
            <Button variant="outline-info" type="submit">
              Confirm
            </Button>
          </ButtonToolbar>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default RegisterComponent;
