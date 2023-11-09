import { Container, Button, Navbar, Nav, Badge, NavbarToggle, Collapse} from "react-bootstrap";
import "./Header.css";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import { SessionContext } from "../../App";
import { Link } from "react-router-dom";
import axios from "axios";



const Header = () => {
  const { cartCount, setCartData, setCartCount } = useContext(SessionContext);
  let navigate = useNavigate();
  const UserData = localStorage.getItem("User");
  const User = JSON.parse(UserData);
  const emailData = {
    email:User.email
  }
  const CartAPI = "https://itemcatalog-t930.onrender.com/cartItems";
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  

  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("Token")}`;

  useEffect(() => {      
      axios
        .post(CartAPI, emailData)
        .then((res) => {
          if(
            res.data.message === "Cart data have been retrieved successfully."
          ) {
            setCartData(res.data.data);
            setCartCount((res.data.data.productList).length);
          }
        })
        .catch((err) => {
          alert(err.message);
          if (err.response.data.message === "Not Authenticated") {
            navigate("/login");
          }
        });
  }, [cartCount]);

  return (
    <div>
      
      <Navbar collapseOnSelect bg="dark" data-bs-theme="dark" expand='lg'>
      <Navbar.Brand href="/home">
            <img
              alt=""
              src={window.location.origin + `/img/shop.png`}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            MegaShop
          </Navbar.Brand>
      <NavbarToggle onClick={toggleNavbar} className="me-2" />
        <Collapse isOpen={!collapsed} navbar>
        <Container fluid>
        
        <Navbar.Collapse expand='lg'>
        
          <Nav className="justify-content-center me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/contact-us">Contact Us</Nav.Link>
          </Nav>
        </Navbar.Collapse>
         
         
          <Navbar.Collapse expand='lg' className="justify-content-end m-2">
            
            <Navbar.Text className="m-2">
              <NavDropdown title={User.name} id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Orders</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Cancel Order</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Update Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/logout">
                  Logout
                </NavDropdown.Item>
              </NavDropdown>{" "}
            </Navbar.Text>
            <Navbar.Text className="m-2">
              {/* <Button variant="info" size="sm"><span><img className='cart-icon' src={window.location.origin + './img/cart.png'} alt=''/></span> Cart <span className='badge' id='cartCount'> {cartCount} </span></Button> */}
              <Link to="/myCart">
              <Button variant="warning" size="sm">
                <span>
                  <img
                    className="cart-icon"
                    src={window.location.origin + `/img/cart.png`}
                    alt=""
                  />
                </span>
                {" "}Cart{" "}
                <Badge bg="secondary">{cartCount}</Badge>
                 
              </Button>
              </Link>
              
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
