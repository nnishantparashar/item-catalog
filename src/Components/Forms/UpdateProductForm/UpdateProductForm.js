import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
import { Form, Col, Row, Button } from "react-bootstrap";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const UpdateProductForm = () => {
  const { state } = useLocation();
  const { product } = state || {};
 
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [quantity, setQuantity] = useState(product.quantity);
  const [image, setImage] = useState(product.image);
  const [description, setDescription] = useState(product.shortDescription);

  let navigate = useNavigate();

  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };

  const priceChangeHandler = (event) => {
    setPrice(event.target.value);
  };

  const quantityChangeHandler = (event) => {
    setQuantity(event.target.value);
  };

  const imageChangeHandler = (event) => {
    setImage(event.target.value);
  };

  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value);
  };

  
  // set default field value from state object and then set updateData and hit the api.

  const updateData = {
    name: name,
    price: price,
    quantity: quantity,
    image: image,
    shortDescription: description,
  };

  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("Token")}`;

  const UpdateAPI = `https://itemcatalog-t930.onrender.com/updateProduct/${product.productId}`;

  const updateProductHandler = (e) => {
    
    axios
     .put(UpdateAPI, updateData)
     .then((res) => {
       alert(res.data.message);
       if (res.data.message === "Product has been updated successfully.") {
           navigate("/admin-dashboard");
       }
     })
     .catch((error) => {
       alert(error.message);
     });
 };

  return (
    <div>
      <Header />
      <div className="heading">
        <h3>Update Product</h3>
      </div>
      <div className="form">
        <Form>
          <Row className="mb-3">
            

            <Form.Group as={Col}>
              <Form.Label>Name</Form.Label>
              <Form.Control
                defaultValue={product.name}
                onChange={nameChangeHandler}
                placeholder="Alpha"
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Price</Form.Label>
              <Form.Control
                defaultValue={product.price}
                onChange={priceChangeHandler}
                placeholder="12999/..."
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            
            <Form.Group as={Col}>
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                defaultValue={product.quantity}
                onChange={quantityChangeHandler}
                placeholder="5-8-10.."
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Image</Form.Label>
              <Form.Control
                defaultValue={product.image}
                onChange={imageChangeHandler}
                placeholder="product.png"
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Description</Form.Label>
            <Form.Control
              defaultValue={product.shortDescription}
              onChange={descriptionChangeHandler}
              placeholder="Quality product from abc inc..."
            />
          </Form.Group>

          <Button onClick={updateProductHandler} variant="primary">
            Submit
          </Button>
        </Form>
      </div>{" "}
      <Link to="/admin-dashboard">
        <Button>Back</Button>{" "}
      </Link>
      <Footer />
    </div>
  );
};

export default UpdateProductForm;
