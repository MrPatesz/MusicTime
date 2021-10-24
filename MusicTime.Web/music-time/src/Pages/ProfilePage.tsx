import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import useChangePassword from "../Hooks/Mutations/UserMutations/useChangePassword";

type FormValues = {
  CurrentPassword: string;
  NewPassword: string;
};

function ProfilePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const changePassword = useChangePassword();

  const username = localStorage.getItem("userName");

  function changePasswordFunction(data: FormValues) {
    if (username) {
      changePassword.mutate({
        username: username,
        currentPassword: data.CurrentPassword,
        newPassword: data.NewPassword,
      });
    }
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
      <h1>{username}</h1>
      <Form
        style={{ width: "500px" }}
        onSubmit={handleSubmit((data) => {
          changePasswordFunction(data);
        })}
      >
        <Form.Group>
          <Form.Label>Current password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Current password"
            {...register("CurrentPassword", { required: true, maxLength: 256 })}
          />
          {errors.CurrentPassword?.type === "required" &&
            "Current password is required"}
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>New password</Form.Label>
          <Form.Control
            type="password"
            placeholder="New password"
            {...register("NewPassword", { required: true, maxLength: 256 })}
          />
          {errors.NewPassword?.type === "required" &&
            "New password is required"}
        </Form.Group>

        <Button type="submit" variant="outline-info">
          Change password
        </Button>
      </Form>
    </div>
  );
}

export default ProfilePage;
