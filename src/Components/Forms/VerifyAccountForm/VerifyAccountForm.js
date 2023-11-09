import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import "./VerifyAccountForm.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const VerifyAccountForm = () => {

let navigate = useNavigate();

const [email, setEmail] = useState('');

const emailHandler = (e) => {
  setEmail(e.target.value);
}

const emailData = {
  'email': email
}

const VerifyAPI = "https://itemcatalog-t930.onrender.com/verify-account";

const verifyHandler = async() => {

    await axios.post(VerifyAPI, emailData)
     .then((res) =>{
       alert(res.data.message);
       if(res.data.message === 'Account has been activated successfully.'){
         navigate("/");
       }
     })
     .catch((err) => {
       alert(err.message);
     })
   

};

  return (
    <div>
      <div className="heading">
        <h3>Verify Account</h3>
      </div>
      <div className="form">
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="2">
              Enter your email for verification  
            </Form.Label>
            <Col sm="10">
              <Form.Control type="email" onChange={emailHandler} placeholder="abc@xmail.com" />
            </Col>
          </Form.Group>
          
          <Button onClick={verifyHandler} variant="primary">Submit</Button>{" "}
        </Form>
      </div>
    </div>
  );
};

export default VerifyAccountForm;






