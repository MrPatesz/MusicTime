import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function LoginPage() {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "35%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Form style={{ width: "500px" }}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control placeholder="Enter username" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="outline-info" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default LoginPage;
