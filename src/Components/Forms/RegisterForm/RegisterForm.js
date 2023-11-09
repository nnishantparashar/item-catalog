import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import "./RegisterForm.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const RegisterForm = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  let navigate = useNavigate();

  const nameChangeHandler = (event) => {
    setName(event.target.value);
  }

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  }

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  }

  const mobileChangeHandler = (event) => {
    setMobile(event.target.value);
  }

  const addressChangeHandler = (event) => {
    setAddress(event.target.value);
  }

  const registrationData = {
    'name': name,
    'email': email,
    'password': password,
    'mobile': mobile,
    'address': address
  }

  const RegisterAPI = "https://itemcatalog-t930.onrender.com/register"; 
const registrationHandler = async () => {
 
   await axios.post(RegisterAPI, registrationData)
    .then((res) =>{
      alert(res.data.message);
      if(res.data.message === 'User has been registered successfully.'){
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
        <h3>Register User</h3>
      </div>
      <div className="form">
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="">
            <Form.Label column sm="2">
              Name :
            </Form.Label>
            <Col sm="10">
              <Form.Control type="text" onChange={nameChangeHandler} placeholder="John Doe" />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="">
            <Form.Label column sm="2">
              Email :
            </Form.Label>
            <Col sm="10">
              <Form.Control type="email" onChange={emailChangeHandler} placeholder="abc@xmail.com" />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="">
            <Form.Label column sm="2">
              Password :
            </Form.Label>
            <Col sm="10">
              <Form.Control type="password" onChange={passwordChangeHandler} placeholder="Password" />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="">
            <Form.Label column sm="2">
              Mobile :
            </Form.Label>
            <Col sm="10">
              <Form.Control type="number"  onChange={mobileChangeHandler} placeholder="9873.." />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="">
            <Form.Label column sm="2">
              Address :
            </Form.Label>
            <Col sm="10">
              <Form.Control type="text"  onChange={addressChangeHandler} placeholder="6th lane, z-block.." />
            </Col>
          </Form.Group>
          <Button onClick={registrationHandler} variant="primary">Submit</Button>{" "}
        </Form>
      </div>
    </div>
  );
};

export default RegisterForm;
