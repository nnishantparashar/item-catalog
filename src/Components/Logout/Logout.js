import "./Logout.css";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect} from "react";
import { SessionContext } from "../../App";


const Logout = () => {
  
  const { setToken, setProducts, setIsLoggedIn } = useContext(SessionContext)
  let navigate = useNavigate();

  const API = "https://itemcatalog-t930.onrender.com/logout";

  useEffect(() => {
    fetch(API)
      .then((data) => {
        return data.json();
      })
      .then((post) => {
        setToken("");
        setProducts([]);
        setIsLoggedIn(false);
        localStorage.clear();
        navigate("/");

      });
} , [])

  

 
};

export default Logout;
