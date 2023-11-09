import { Container, Form, Col, Row, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useContext, useState } from "react";
import { SessionContext } from "../../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Item = (props) => {
  const { cartData, setCartData, setCartCount } = useContext(SessionContext);
  let navigate = useNavigate();

  const UserData = localStorage.getItem("User");
  const User = JSON.parse(UserData);
  const CartAPI = "https://itemcatalog-t930.onrender.com/cartItems";
  const RemoveAPI = "https://itemcatalog-t930.onrender.com/removeFromCart";
  const UpdateAPI = "https://itemcatalog-t930.onrender.com/updateItem";
  const removeData = {
    user: User.email,
    productId: props.item.productId,
    totalAmount:
      parseInt(cartData.totalAmount) - parseInt(props.item.totalPrice),
  };

  const emailData = {
    email:User.email
  }

  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("Token")}`;

  const getData = async () => {
    return await axios
      .post(CartAPI, emailData)
      .then((res) => {
        if (
          res.data.message === "Cart data have been retrieved successfully."
        ) {
          setCartData(res.data.data);
          setCartCount(res.data.data.productList.length);
        }
        if (res.data.message === "No item in user's cart") {
          setCartData([]);
          setCartCount(0);
        }
      })
      .catch((err) => {
        alert(err.message);
        if (err.response.data.message === "Not Authenticated") {
          navigate("/login");
        }
      });
  };
  const removeItemHandler = async () => {
    return await axios
      .post(RemoveAPI, removeData)
      .then((res) => {
        if (res.data.message === "item successfully removed from cart") {
          getData();
          navigate("/myCart");
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const totalPriceHandler = async (e) => {
    const quantity = e.target.value;
    const oldTotalPrice = props.item.totalPrice;
    var totalAmount = cartData.totalAmount;
    const newTotal = props.item.price * quantity;

    //calculate totalAmount on quantityChange->

    totalAmount = totalAmount - oldTotalPrice + newTotal;

    
    //set data for update
    let updateData = {
      user: User.email,
      productId: props.item.productId,
      quantity: quantity,
      totalPrice: newTotal,
      totalAmount: totalAmount,
    };
    //hit updateItem api endpoint
    return await axios
      .post(UpdateAPI, updateData)
      .then((res) => {
        if (res.data.message === "item successfully updated") {
          getData();
          navigate("/myCart");
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div style={{ margin: "2rem" }}>
      <Container fluid="md">
        <Card style={{ gap: "2rem" }}>
          <Card.Body style={{ background: "aqua" }}>
            <Card.Title>{props.item.name}</Card.Title>
          </Card.Body>
          <ListGroup>
            <ListGroup.Item>Price per unit : {props.item.price}</ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col xs={4}></Col>
                <Col xs={3}>Quantity</Col>
                <Col xs={1}>
                  <Form.Select onChange={totalPriceHandler}>
                    <option value={props.item.quantity}>
                      {props.item.quantity}
                    </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </Form.Select>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              Total Price : {props.item.totalPrice}
            </ListGroup.Item>
          </ListGroup>
          <Card.Body>
            <Button onClick={removeItemHandler} variant="outline-danger">
              Remove Item
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Item;
