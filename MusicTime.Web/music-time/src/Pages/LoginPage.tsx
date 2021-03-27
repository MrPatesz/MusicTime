import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useState } from "react";

function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function loginFunction() {
    const loginCall = async () => {
      const result = await axios({
        method: "post",
        url: "https://localhost:5001/api/users/login",
        headers: {},
        data: {
          UserName: username,
          Password: password,
        },
      });
      localStorage.setItem("authToken", String(result.data));
    };
    loginCall();
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
      <Form style={{ width: "500px" }}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button onClick={loginFunction} variant="outline-info">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default LoginPage;
