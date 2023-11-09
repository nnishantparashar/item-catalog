import { useContext } from "react";
import { SessionContext } from "../../App";
import Header from "../Header/Header";


const OrderConfirmation = () => {

    const { orderResponse } = useContext(SessionContext);

    return (
    <div>
        <Header/>
        <h2>Your order is placed successfully</h2>
        <h3>OrderId is {orderResponse._id}</h3>
        <p>Your Order Will be Delivered in 5 Days</p>
    </div>
        );

}

export default OrderConfirmation;