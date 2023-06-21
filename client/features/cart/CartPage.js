import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart, updateQuantity } from './cartSlice';

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const [paymentDetails, setPaymentDetails] = useState({
    amount: '',
    currency: '',
    source: '',
  });

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleQuantityChange = (productId, quantity) => {
    dispatch(updateQuantity({ productId, quantity }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    // Perform payment logic using paymentDetails state
    console.log('Payment details:', paymentDetails);
  };

  return (
    <div>
      <h2>Cart</h2>
      {cartItems?.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartItems?.map((item) => (
              <li key={item.id}>
                <h3>{item.name}</h3>
                <p>Quantity: </p>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                />
                <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <form onSubmit={handlePayment}>
            <input
              type="text"
              id="amount"
              placeholder="Amount"
              value={paymentDetails.amount}
              onChange={(e) => setPaymentDetails({ ...paymentDetails, amount: e.target.value })}
            />
            <input
              type="text"
              id="currency"
              placeholder="Currency"
              value={paymentDetails.currency}
              onChange={(e) => setPaymentDetails({ ...paymentDetails, currency: e.target.value })}
            />
            <input
              type="text"
              id="source"
              placeholder="Source Token"
              value={paymentDetails.source}
              onChange={(e) => setPaymentDetails({ ...paymentDetails, source: e.target.value })}
            />
            <button type="submit">Pay with Stripe</button>
            <button id="paypal-button">Pay with PayPal</button>
          </form>
        </>
      )}
    </div>
  );
};

export default CartPage;