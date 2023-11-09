import { Form, Col, Row, Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './AddProductForm.css'
import { Link } from "react-router-dom";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";

const AddProductForm = () => {
  
  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  let navigate = useNavigate();

  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };

  const idChangeHandler = (event) => {
    setProductId(event.target.value);
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

  const clearInput = () => {
    setName('');
    setProductId('');
    setPrice('');
    setQuantity('');
    setImage('');
    setDescription('');

  }

  const addData = {
    productId: productId,
    name: name,
    price: price,
    quantity: quantity,
    image: image,
    shortDescription: description,
  };

  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("Token")}`;

  const AddAPI = "https://itemcatalog-t930.onrender.com/addProducts";
  const addProductHandler = (e) => {
    
     axios
      .post(AddAPI, addData)
      .then((res) => {
        alert(res.data.message);
        if (res.data.message === "Product has been added successfully.") {
            clearInput();
          
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div>
        <Header/>
      <div className="heading">
        <h3>Add Product</h3>
      </div>
      <div className="form">
        <Form>
        <Row className="mb-3">
            <Form.Group as={Col} >
              <Form.Label>ProductId</Form.Label>
              <Form.Control value={productId} onChange={idChangeHandler} placeholder="AlphaCX4"/>
            </Form.Group>

            <Form.Group as={Col} >
              <Form.Label>Name</Form.Label>
              <Form.Control value={name} onChange={nameChangeHandler} placeholder="Alpha" />
            </Form.Group>
          </Row>
          
          <Row className="mb-3">
          <Form.Group as={Col} >
              <Form.Label>Price</Form.Label>
              <Form.Control value={price} onChange={priceChangeHandler} placeholder="12999/..." />
            </Form.Group>
            <Form.Group as={Col} >
              <Form.Label>Quantity</Form.Label>
              <Form.Control value={quantity} onChange={quantityChangeHandler} placeholder="5-8-10.." />
            </Form.Group>

            <Form.Group as={Col} >
              <Form.Label>Image</Form.Label>
              <Form.Control value={image} onChange={imageChangeHandler} placeholder="product.png" />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Description</Form.Label>
            <Form.Control value={description} onChange={descriptionChangeHandler} placeholder="Quality product from abc inc..." />
          </Form.Group>

          

          <Button onClick={addProductHandler} variant="primary">
            Submit
          </Button>
        </Form>
        
      </div>
      {" "}
    <Link to="/admin-dashboard"><Button >Back</Button> </Link>
    <Footer/>
    </div>
  );
};

export default AddProductForm;
