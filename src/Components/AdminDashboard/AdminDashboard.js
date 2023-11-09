import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header/Header";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  let navigate = useNavigate();
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("Token")}`;

  const API = "https://itemcatalog-t930.onrender.com/products";
  useEffect(() => {
    axios
      .get(API)
      .then((res) => {
        if (res.data.message === "Products have been retrieved successfully.") {
          setProducts(res.data.data);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("Token")}`;


  const updateHandler = (product) =>{
    
      navigate("/update-product", { state: { product: product } });
  }

  const removeHandler = (id) => {
    console.log(id);
    let RemoveAPI = `https://itemcatalog-t930.onrender.com/deleteProduct/${id}`;
    let text = `Delete ${id} ?`;
    if (window.confirm(text) == true) {
      return axios
        .delete(RemoveAPI)
        .then((res) => {
          alert(res.data.message);
          if (res.data.message === "Product have been deleted successfully.") {
            navigate("/admin-dashboard");
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="heading">
        <h3>Update/Delete Product</h3>
      </div>

      <Table responsive="sm">
        <thead>
          <tr>
            <th>ProductId</th>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Quality</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, i) => (
            <tr key={i}>
              <td>{product.productId}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>
                <span>
                  
                    <Button
                      onClick={(i) => updateHandler(product)}
                      variant="primary"
                    >
                      Update
                    </Button>{" "}
                  
                </span>{" "}
                <span>
                  <Button
                    onClick={(i) => removeHandler(product.productId)}
                    variant="primary"
                  >
                    Delete
                  </Button>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h4>
        Add Product :{" "}
        <span>
          {" "}
          <Link to="/add-product">
            <Button>Click Here</Button>{" "}
          </Link>
        </span>
      </h4>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
