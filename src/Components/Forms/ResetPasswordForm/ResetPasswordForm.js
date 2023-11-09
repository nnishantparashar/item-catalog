import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import "./ResetPasswordForm.css";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";

const ResetPasswordForm = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  let [searchParams] = useSearchParams()
  const token = searchParams.get("token")
  const userId = searchParams.get("userId")

  let navigate = useNavigate();

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };
  const confirmPasswordHandler = (event) => {
    setConfirmPassword(event.target.value);
  };

const resetData = {
  
    "userId":userId,
    "token": token,
    "newPassword": password

}

  const API = "https://itemcatalog-t930.onrender.com/reset-password"; 
  const resetHandler = () => {
    if(password === ''){
      alert('Please enter a valid password.')
    }
    else if(password !== confirmPassword){
      alert('Passwords do NOT match!')
    }else{
      return fetch(API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(resetData)
      })
        
        .then(data => data.json())
        .then((result) =>{
          alert(result.message);
          if(result.message === 'Password has been reset successfully.'){
            navigate("/login");
          }
        })
    }
    
  };
  return (
    <div>
      <div className="heading">
        <h3>Reset Password</h3>
      </div>
      <div className="form">
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="">
            <Form.Label column sm="2">
              Password :
            </Form.Label>
            <Col sm="10">
              <Form.Control
                onChange={passwordHandler}
                type="password"
                placeholder="Password"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="">
            <Form.Label column sm="2">
              Confirm Password :
            </Form.Label>
            <Col sm="10">
              <Form.Control
                onChange={confirmPasswordHandler}
                type="text"
                placeholder="Confirm Password"
              />
            </Col>
          </Form.Group>
          <Button onClick={resetHandler} variant="primary">
            Submit
          </Button>{" "}
        </Form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
