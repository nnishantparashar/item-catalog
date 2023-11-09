import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../../App";
import axios from "axios";

const Product = (props) => {
  const { cartData, cartCount, setCartCount } = useContext(SessionContext);
  const [action, setAction] = useState("Add to Cart");
  const UserData = localStorage.getItem("User");
  const User = JSON.parse(UserData);
  const inStock = props.product.quantity;

  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("Token")}`;

  const AddAPI = "https://itemcatalog-t930.onrender.com/addToCart";
  const RemoveAPI = "https://itemcatalog-t930.onrender.com/removeFromCart";

  const getTotalAdd = () => {
    let total = 0;
    if (cartData.totalAmount) {
      total = cartData.totalAmount + props.product.price;
    } else {
      total = props.product.price;
    }
    return total;
  };

  const getTotalRemove = () => {
    let total = 0;
    if (cartData.totalAmount) {
      const item = cartData.productList.filter((product) => {
        return product.productId === props.product.productId;
      });
      const itemQuantity = item[0].quantity;
      total = cartData.totalAmount - props.product.price * itemQuantity;
    } else {
      total = props.product.price;
    }
   
    return total;
  };

  
  useEffect(() => {
    if (cartData.productList) {
      cartData.productList.filter((item) => {
        if (props.product.productId === item.productId) {
          setAction("Remove from Cart");
        }
      });
    }
  }, [cartData]);

  const handleCart = async (action) => {
    if (action === "Add to Cart") {
      const addData = {
        user: User.email,
        productList: {
          productId: props.product.productId,
          name: props.product.name,
          image: props.product.image,
          price: props.product.price,
          totalPrice: props.product.price,
          quantity: 1,
        },
        totalAmount: getTotalAdd(),
      };
      return await axios
        .post(AddAPI, addData)
        .then((res) => {
          if (res.data.message === "item successfully added to new cart") {
            setAction("Remove from Cart");
            setCartCount(cartCount + 1);
          }
          if (res.data.message === "item successfully added to existing cart") {
            setAction("Remove from Cart");
            setCartCount(cartCount + 1);
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    }

    if (action === "Remove from Cart") {
      const removeData = {
        user: User.email,
        productId: props.product.productId,
        totalAmount: getTotalRemove(),
      };
      return await axios
        .post(RemoveAPI, removeData)
        .then((res) => {
          if (res.data.message === "item successfully removed from cart") {
            setAction("Add to Cart");
            setCartCount(cartCount - 1);
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };
  return (
    <Card className="card" style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src={window.location.origin + `/img/${props.product.image}`}
      />
      <Card.Body>
        <Card.Title>{props.product.name}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>
         <u> Description</u> : {props.product.shortDescription}
        </ListGroup.Item>
        <ListGroup.Item><u>Price</u> : {props.product.price}</ListGroup.Item>
        <ListGroup.Item><u>InStock</u> : {inStock}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        {inStock >= 1 ? (
          <Button onClick={(e) => handleCart(action)} variant="primary">
            {action}
          </Button>
        ) : (
          <p style={{ color: "red" }}>
            <b>Currently Unavailable..</b>
          </p>
        )}
      </Card.Body>
    </Card>
  );
};

export default Product;
