import { useNavigate } from "react-router-dom";
import './Register.css';

const Register = () => {
    
    let navigate = useNavigate();
    const register = () => {
        navigate("/register");
    };

    return (
        <div className="register">
            <p>Click this button to Register</p>
            <button onClick={register}>Register</button>
        </div>
    )
}

export default Register;