import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearCart, fetchCartAsync, removeFromCart, selectCartItems, updateQuantity } from "./cartSlice";

const CartPage = () => {
   const dispatch = useDispatch();
   const username = useSelector((state) => state.auth.me.username);
   const cartItems = useSelector(selectCartItems);

   useEffect(() => {
      dispatch(fetchCartAsync({ username }))
   }, [dispatch, username])

   const handleRemoveItem = async (productId, itemId) => {
      dispatch(removeFromCart({ username, productId, itemId }));
      dispatch(fetchCartAsync({ username }));
   };

   const handleQuantityChange = async (orderId, productId, quantity) => {
      dispatch(updateQuantity({ orderId, username, productId, quantity }));
   };

   const handleClearCart = async (orderId) => {
      dispatch(clearCart({ username, orderId }));
   }

   return (
      <div>
         <h2>Cart</h2>
         {!cartItems || cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
         ) : (
            <>
               <h1>Order #{cartItems[0].orderId}</h1>
               <ul>
                  {cartItems?.map((item) => (
                     <li key={item.id}>
                        <h3>{item.name}</h3>
                        <p>Quantity: </p>
                        <input
                           type='number'
                           min='1'
                           value={item.quantity}
                           onChange={(e) => 
                              handleQuantityChange(item.orderId, item.productId, parseInt(e.target.value))}
                        />
                        <h5>Price: {item.price / 100}</h5>
                        <h4>Total: {item.total / 100}</h4>
                        <button onClick={() => handleRemoveItem(item.productId, item.id)}>
                           Remove
                        </button>
                     </li>
                  ))}
                  <button onClick={() => handleClearCart(cartItems[0].orderId)}>
                     <strong>Clear Cart</strong>
                  </button>
               </ul>
               <Link to='/checkout'>Proceed to Checkout</Link>
            </>
         )}
      </div>
   );
};

export default CartPage;
