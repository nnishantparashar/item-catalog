
import { useState, createContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import ActivateAccountForm from './Components/Forms/ActivateAccount/ActivateAccountForm';
import ForgotPasswordForm from './Components/Forms/ForgotPasswordForm/ForgotPasswordForm';
import LoginForm from './Components/Forms/LoginForm/LoginForm';
import RegisterForm from './Components/Forms/RegisterForm/RegisterForm';
import ResetPasswordForm from './Components/Forms/ResetPasswordForm/ResetPasswordForm';
import VerifyAccountForm from './Components/Forms/VerifyAccountForm/VerifyAccountForm';
import Home from './Components/Home/Home';
import Logout from './Components/Logout/Logout';
import Welcome from './Components/Welcome/Welcome';
import About from './Components/About/About';
import Contact from './Components/Contact/Contact';
import Cart from './Components/Cart/Cart';
import OrderConfirmation from './Components/OrderConfirmation/OrderConfimation';
import AddProductForm from './Components/Forms/AddProductForm/AddProductForm';
import AdminDashboard from './Components/AdminDashboard/AdminDashboard';
import UpdateProductForm from './Components/Forms/UpdateProductForm/UpdateProductForm';

export const SessionContext = createContext({});
//Backend Update: 
//reduce quantity of product/item after placing order.
// check availablity of product before placing order
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState('');
  const [orderResponse, setOrderResponse] = useState([]);

  return (
    <div className="App" >
      <SessionContext.Provider value={{ orderResponse, setOrderResponse, isLoggedIn, setToken, token, setIsLoggedIn, user, setUser, cartData, setCartData, cartCount, setCartCount, products, setProducts}}>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/verify-account" element={<VerifyAccountForm />} />
        <Route path="/activate-account" element={<ActivateAccountForm />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route path="/reset-password" element={<ResetPasswordForm />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/about" element={<About/>} />
        <Route path="/myCart" element={<Cart/>} />
        <Route path="/order-confirmation" element={<OrderConfirmation/>} />
        <Route path="/add-product" element={<AddProductForm/>} />
        <Route path="/update-product" element={<UpdateProductForm/>} />
        <Route path="/admin-dashboard" element={<AdminDashboard/>} />


      </Routes>

      </SessionContext.Provider>
      
    </div>
  );
}

export default App;
