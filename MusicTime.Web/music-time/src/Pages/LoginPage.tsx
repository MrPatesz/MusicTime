import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import axios from "axios";
import { useState } from "react";
import { ButtonToolbar } from "react-bootstrap";

function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function loginFunction() {
    const loginCall = async () => {
      try {
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
        alert("Successfully logged in");
      } catch (err) {
        alert("Wrong username or password");
      }
    };
    loginCall();
  }

  function registerFunction() {
    if(username === "" || password === "") {
      alert("Please provide a username and a password");
      return;
    }
    const registerCall = async () => {
      try {
        await axios({
          method: "post",
          url: "https://localhost:5001/api/users/register",
          headers: {},
          data: {
            UserName: username,
            Password: password,
          },
        });
        alert("Successfully registered");
      } catch (err) {
        alert("This username is already taken");
      }
    };
    registerCall();
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

        <ButtonToolbar
          className="justify-content-between"
          aria-label="Toolbar with Button groups"
        >
          <ButtonGroup>
            <Button onClick={loginFunction} variant="outline-info">
              Log in
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button onClick={registerFunction} variant="outline-info">
              Register
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
      </Form>
    </div>
  );
}

export default LoginPage;
