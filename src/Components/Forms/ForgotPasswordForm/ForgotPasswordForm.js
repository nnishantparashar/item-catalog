import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import "./ForgotPasswordForm.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPasswordForm = () => {

let navigate = useNavigate();

const [email, setEmail] = useState();

const emailHandler = (e) => {
  setEmail(e.target.value);
}

const emailData = {
  'email': email
}

const API = "https://itemcatalog-t930.onrender.com/forgot-password";

const forgotPasswordHandler = () => {
  return fetch(API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(emailData)
  })
    
    .then(data => data.json())
    .then((result) =>{
      alert(result.message);
      if(result.message === 'Password reset link has been sent to your email.'){
        navigate("/");
      }
    })
}

  return (
    <div>
      <div className="heading">
        <h3>Forgot Password</h3>
      </div>
      <div className="form">
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="2">
              Email : 
            </Form.Label>
            <Col sm="10">
              <Form.Control type="email" onChange={emailHandler} placeholder="abc@xmail.com" />
            </Col>
          </Form.Group>
          
          <Button onClick={forgotPasswordHandler} variant="primary">Submit</Button>{" "}
        </Form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;




