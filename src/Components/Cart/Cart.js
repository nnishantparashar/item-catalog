import Button from "react-bootstrap/Button";
import { useContext, useState, useEffect } from "react";
import { SessionContext } from "../../App";
import Item from "../Item/Item";
import Header from "../Header/Header";
import "./Cart.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";

const Cart = () => {
  const { cartData, setCartCount, setOrderResponse, setCartData } = useContext(SessionContext);
  const [products, setProducts] = useState([]);

  let navigate = useNavigate();

  const Items = cartData.productList;

  const orderData = {
    user: cartData.user,
    productList: Items,
    billAmount: cartData.totalAmount,
  };

  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("Token")}`;

  const ProductAPI = "https://itemcatalog-t930.onrender.com/products";
  const OrderAPI = "https://itemcatalog-t930.onrender.com/place-order";

  useEffect( () => {
     axios
      .get(ProductAPI)
      .then((res) => {
        if (res.data.message === "Products have been retrieved successfully.") {
          setProducts(res.data.data);
        }
      })
      .catch((err) => {
        if (err.response.data.message === "Not Authenticated") {
          navigate("/login");
        }
      });
  }, []);

  const orderHandler = async () => {

    localStorage.setItem("Check", 0);
    products.forEach((product) => {
      Items.forEach((item) => {
        if (product.productId === item.productId) {
          if (product.quantity < item.quantity) {
            localStorage.setItem("Check", 1);
            alert(
              `Selected quantity is not available for ${item.name}. Please proceed with lesser quantity.`
            );
          }
        }
      });
    });

    let check = localStorage.getItem("Check");
    if(check < 1) {
      localStorage.removeItem("Check");
      await axios
        .post(OrderAPI, orderData)
        .then((res) => {
          if (res.data.message === "Order placed successfully.") {
            setOrderResponse(res.data.data);
            setCartCount(0);
            setCartData([]);
            navigate("/order-confirmation");
          }
        })
        .catch((err) => {
          console.log("Error", err)
          alert(err.message);
        });
    }else {
      navigate("/myCart");
    }
   
  };

  return (
    <div>
      <Header />
      {!Items ? (
        <h1 style={{ color: "red", margin: "50px" }}>Empty Bag..</h1>
      ) : (
        Items.map((item) => {
          return <Item item={item} key={item._id} />;
        })
      )}
      {Items && (
        <div className="cartAction">
          <span>
            <h3>Grand Total : {cartData.totalAmount}</h3>
          </span>
          {"   "}
          <span>
            <Button onClick={(e) => orderHandler()} variant="success" size="lg">
              Place Order
            </Button>
          </span>
        </div>
      )}
      <Footer/>
    </div>
  );
};

export default Cart;
