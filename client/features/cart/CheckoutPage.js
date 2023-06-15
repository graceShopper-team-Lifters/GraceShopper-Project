import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "./cartSlice";

const CheckoutPage = () => {
   const cartItems = useSelector((state) => state.cart);
   const dispatch = useDispatch();

   const handleCheckout = () => {
      // Code checkout process

      dispatch(clearCart());
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
               <button onClick={handleCheckout}>Checkout</button>
            </>
         )}
      </div>
   );
};

export default CheckoutPage;