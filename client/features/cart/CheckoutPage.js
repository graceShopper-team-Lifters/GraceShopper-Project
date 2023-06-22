import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearCart } from "./cartSlice";

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [paymentDetails, setPaymentDetails] = useState({
    amount: "",
    currency: "",
    source: "",
  });

  const handleCheckout = async (e) => {
    e.preventDefault();
    // Simulate checkout process
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Perform payment logic using paymentDetails state
    console.log("Payment details:", paymentDetails);

    dispatch(clearCart());

    navigate("/order-placed");
  };

  const handlePaymentDetailsChange = (e) => {
    const { id, value } = e.target;
    setPaymentDetails((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  return (
    <div>
      <h2>Checkout</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <h3>Order Summary</h3>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <p>{item.name}</p>
                <p>Quantity: {item.quantity}</p>
              </li>
            ))}
          </ul>
          <form onSubmit={handleCheckout}>
            <input
              type="text"
              id="amount"
              placeholder="Amount"
              value={paymentDetails.amount}
              onChange={handlePaymentDetailsChange}
            />
            <input
              type="text"
              id="currency"
              placeholder="Currency"
              value={paymentDetails.currency}
              onChange={handlePaymentDetailsChange}
            />
            <input
              type="text"
              id="source"
              placeholder="Source Token"
              value={paymentDetails.source}
              onChange={handlePaymentDetailsChange}
            />
            <button type="submit">Place Order</button>
          </form>
        </>
      )}
      <p>
        <Link to="/cart">Go back to Cart</Link>
      </p>
    </div>
  );
};

export default CheckoutPage;