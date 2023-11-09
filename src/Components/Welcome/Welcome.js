import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import './Welcome.css';



const Welcome = () => {

    let navigate = useNavigate();
    const handleSignIn = () => {
        navigate("/login");
    };

    const handleSignUp = () => {
        navigate("/register");
    };

    const handleActivate = () => {
      navigate("/verify-account");
  };

    

  return (
    <div>
{/* <div className="welcome" style={{ backgroundImage: `url('${BackgroundImage}')`, height:600, maskRepeat:"no-repeat", backgroundSize:'cover'}}>
      </div> */}
        
      <div className="content">
        <h1 className="welcome-header">Welcome to MegaShop</h1>
        <p className="welcome-text">Explore our new range of products</p>
        <div className="welcome-action">
        <Button onClick={handleSignIn}>Sign-in</Button>{" "}
        { " "}<Button onClick={handleSignUp}>Sign-up</Button>{" "}
        <Button onClick={handleActivate}>Activate Account</Button>
        </div>
       
      </div>
    </div>
    
    
   
  );
};

export default Welcome;