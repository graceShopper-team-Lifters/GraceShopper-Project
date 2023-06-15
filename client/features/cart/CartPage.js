import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
         {cartItems?.length === 0 ? (
            <p>Your cart is empty.</p>
         ) : (
            <>
               <ul>
<<<<<<< HEAD
                  {cartItems?.map((item) => (
=======
                  {cartItems.map((item) => (
>>>>>>> 05a544a (Improved functionality/coded server side for orders and products)
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
               <Link to='/checkout'>Proceed to Checkout</Link>
            </>
         )}
      </div>
   );
};

export default CartPage;