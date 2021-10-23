import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";

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

  function changePassword(data: FormValues) {
    // TODO
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
      <h1>{localStorage.getItem("userName")}</h1>
      <Form
        style={{ width: "500px" }}
        onSubmit={handleSubmit((data) => {
          changePassword(data);
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
