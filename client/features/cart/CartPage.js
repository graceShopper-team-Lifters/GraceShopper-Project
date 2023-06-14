import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity } from "./cartSlice";

const CartPage = () => {
   const dispatch = useDispatch();
   const cartItems = useSelector((state) => state.cart);

   const handleRemoveItem = (productId) => {
      dispatch(removeFromCart(productId));
   };

   const handleQuantityChange = (productId, quantity) => {
      dispatch(updateQuantity({ productId, quantity }));
   };

   return (
      <div>
         <h2>Cart</h2>
         {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
         ) : (
            <ul>
               {cartItems.map((item) => (
                  <li key={item.id}>
                     <h3>{item.name}</h3>
                     <p>Quantity: </p>
                     <input
                        type='number'
                        min='1'
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                     />
                     <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
                  </li>
               ))}
            </ul>
         )}
      </div>
   );
};

export default CartPage;