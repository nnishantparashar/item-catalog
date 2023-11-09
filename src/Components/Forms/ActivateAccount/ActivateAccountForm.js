
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./ActivateAccountForm.css";
import { useSearchParams, useNavigate } from "react-router-dom";


const ActivateAccountForm = () => {

  let [searchParams] = useSearchParams()
  const token = searchParams.get("token")
  const userId = searchParams.get("userId")

  let navigate = useNavigate();

const activateData = {
  
    "userId":userId,
    "token": token

}

  const API = "https://itemcatalog-t930.onrender.com/activate-account"; 
  const activateHandler = () => {
   
      return fetch(API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(activateData)
      })
        
        .then(data => data.json())
        .then((result) =>{
          alert(result.message);
          if(result.message === 'Account has been activated successfully.'){
            navigate("/login");
          }
        })
    
    
  };
  return (
    <div>
      <div className="heading">
        <h3>Activate Account</h3>
      </div>
      <div className="form">
        <Form>
        <Form.Text id="text">
        Click the button to activate your account
      </Form.Text>
          <Button onClick={activateHandler} variant="primary">
            Activate Account
          </Button>{" "}
        </Form>
      </div>
    </div>
  );
};

export default ActivateAccountForm;
