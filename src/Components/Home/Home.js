import "./Home.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
//import { SessionContext } from "../../App";
import { useNavigate } from "react-router-dom";
import Product from "../Product/Product";
import AdminSection from "../AdminSection/AdminSection";

const Home = () => {
  const [products, setProducts] = useState([]);
  let navigate = useNavigate();
  const UserData = localStorage.getItem("User");
  const User = JSON.parse(UserData);

  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("Token")}`;

  const API = "https://itemcatalog-t930.onrender.com/products";
  useEffect(() => {
    const session = localStorage.getItem("Session");
    if (session) {
      axios
        .get(API)
        .then((res) => {
          if (
            res.data.message === "Products have been retrieved successfully."
          ) {
            setProducts(res.data.data);
          }
        })
        .catch((err) => {
          if (err.response.data.message === "Not Authenticated") {
            navigate("/login");
          }
        });
    } else {
      navigate("/login");
    }
  }, []);

  const isAdmin = () => {
    var isAdmin;
    if (User.role === "0") {
      isAdmin = true;
    } else {
      isAdmin = false;
    }

    return isAdmin;
  };

  return (
    <div>
      <Header />

      {isAdmin() && (
        <div>
          {" "}
          <AdminSection /> 
          
          <hr />
        </div>
      )}
      <div className="homeContent">
        
        {products.map((product) => {
          return <Product product={product} key={product._id} />;
        })}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
