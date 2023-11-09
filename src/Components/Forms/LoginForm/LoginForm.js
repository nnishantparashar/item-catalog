import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const API = "https://itemcatalog-t930.onrender.com/login";

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };
  const loginData = {
    email: email,
    password: password,
  };

  const loginHandler = async () => {
    return await axios
      .post(API, loginData)
      .then((res) => {
        if (res.data.message === "User logged-in successfully.") {
          localStorage.setItem("Session", true);
          localStorage.setItem("Token", res.data.accessToken);
          localStorage.setItem("User", JSON.stringify(res.data.data));
          // console.log(localStorage.getItem("User"));
          navigate("/home");
        }
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };
  return (
    <div className="container">
      <div className="heading">
        <h3>User Login</h3>
      </div>
      <div className="form">
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="2">
              Email :
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="email"
                onChange={(e) => emailHandler(e)}
                placeholder="abc@xmail.com"
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="2">
              Password :
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="password"
                onChange={(e) => passwordHandler(e)}
                placeholder="Password"
              />
            </Col>
          </Form.Group>
          <div className="actionLinks">
            <Button onClick={loginHandler} variant="primary">
              Submit
            </Button>
            <a href="/forgot-password">Forgot Password</a>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
