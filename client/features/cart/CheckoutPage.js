import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearCart } from "./cartSlice";

const CheckoutPage = () => {
   const cartItems = useSelector((state) => state.cart);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [orderPlaced, setOrderPlaced] = useState(false);

   const handleCheckout = async () => {
      // Simulate checkout process
      await new Promise((resolve) => setTimeout(resolve, 2000));

      dispatch(clearCart());

      setOrderPlaced(true);
   };

   if (orderPlaced) {
      return (
         <div>
            <h2>Order Placed</h2>
            <p>Thank you for your purchase!</p>
            <p>
               <Link to='/products'>Continue Shopping</Link>
            </p>
         </div>
      );
   }

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
               <button onClick={handleCheckout}>Place Order</button>
            </>
         )}
         <p>
            <Link to='/cart'>Go back to Cart</Link>
         </p>
      </div>
   );
};

export default CheckoutPage;