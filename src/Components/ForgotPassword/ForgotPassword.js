import { useNavigate } from "react-router-dom";
import './ForgotPassword.css';

const ForgotPassword = () => {
  let navigate = useNavigate();
  const forgotPassword = () => {
    navigate("/forgot-password");
  };
  return (
    <div className="forgot">
        <p>Click button to reset password</p>
      <button onClick={forgotPassword}>Forgot Password</button>
    </div>
  );
};

export default ForgotPassword;
