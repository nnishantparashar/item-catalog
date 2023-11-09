import { useNavigate } from "react-router-dom";
import './Login.css';

const Login = () => {

    
    
    let navigate = useNavigate();
    const login = () => {
        navigate("/login");
    };

    return (
        <div className="login">
            <p>Click this button to Login </p>
            <button onClick={login}>Login</button>
        </div>
    )
}

export default Login;