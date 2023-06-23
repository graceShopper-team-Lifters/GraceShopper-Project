import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearCart, fetchCartAsync, removeFromCart, selectCartItems, updateQuantity } from "./cartSlice";

const CartPage = () => {
   const dispatch = useDispatch();
   const username = useSelector((state) => state.auth.me.username);
   const cartItems = useSelector(selectCartItems);

   const [isLoading, setIsLoading] = useState(false);

   useEffect(() => {
      setIsLoading(true);
      setTimeout(() => {
         dispatch(fetchCartAsync(username));
         setIsLoading(false);
      }, 1500);
   }, [dispatch, username])

   const handleQuantityChange = async (orderId, productId, e) => {
      const quantity = parseInt(e.target.value)
      dispatch(updateQuantity({ orderId, username, productId, quantity }));
   };

   const handleRemoveItem = async (productId, itemId) => {
      dispatch(removeFromCart({ username, productId, itemId }));
      dispatch(fetchCartAsync(username));
   };

   const handleClearCart = async (orderId) => {
      dispatch(clearCart({ username, orderId }));
   };

   if (isLoading) {
      return (
         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <h1>Loading...</h1>
         </div>
      );
   }

   return (
      <div style={styles.container}>
         {username && (
            <h1 style={styles.title}>{username}'s Cart</h1>
         )}
         {!cartItems || cartItems.length === 0 ? (
            <p style={styles.emptyMessage}>Your cart is empty.</p>
         ) : (
            <>
               <h1 style={styles.orderTitle}>Order #{cartItems[0].orderId}</h1>
               <ul style={styles.itemList}>
                  {cartItems && cartItems.length > 0 && cartItems.map((item) => (
                     <li key={item.id} style={styles.item}>
                        <h2 style={styles.itemName}>{item.name}</h2>
                        <p style={styles.itemQuantityLabel}>Quantity: </p>
                        <input
                           type='number'
                           min='1'
                           value={item.quantity}
                           onChange={(e) => 
                              handleQuantityChange(item.orderId, item.productId, e)}
                           style={styles.itemQuantityInput}
                        />
                        <h4 style={styles.itemPrice}>Price: ${item.price / 100}</h4>
                        <h2 style={styles.itemTotal}>Total: ${item.total / 100}</h2>
                        <button onClick={() => handleRemoveItem(item.productId, item.id)} style={styles.removeItemButton}>
                           Remove
                        </button>
                     </li>
                  ))}
                  <button onClick={() => handleClearCart(cartItems[0].orderId)} style={styles.clearCartButton}>
                     <strong>Clear Cart</strong>
                  </button>
               </ul>
               <Link to='/checkout' style={styles.checkoutLink}>Proceed to Checkout</Link>
            </>
         )}
      </div>
   );
};

const styles = {
   container: {
     padding: '20px',
     backgroundColor: '#f5f5f5',
     fontFamily: 'Arial, sans-serif',
   },
   title: {
     fontSize: '24px',
     marginBottom: '10px',
     color: '#333',
     textAlign: 'center',
     textTransform: 'uppercase',
   },
   emptyMessage: {
     fontSize: '18px',
     color: '#666',
     textAlign: 'center',
   },
   orderTitle: {
     fontSize: '20px',
     marginBottom: '10px',
     color: '#333',
     textTransform: 'uppercase',
     borderBottom: '1px solid #ccc',
     paddingBottom: '10px',
   },
   itemList: {
     listStyle: 'none',
     padding: 0,
     margin: '10px 0',
   },
   item: {
     marginBottom: '20px',
     padding: '10px',
     backgroundColor: '#fff',
     boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
   },
   itemName: {
     fontSize: '18px',
     marginBottom: '5px',
     color: '#333',
   },
   itemQuantityLabel: {
     fontSize: '16px',
     marginBottom: '5px',
     color: '#666',
     display: 'inline-block',
   },
   itemQuantityInput: {
     width: '50px',
     fontSize: '16px',
     marginRight: '10px',
   },
   itemPrice: {
     fontSize: '16px',
     marginBottom: '5px',
     color: '#666',
   },
   itemTotal: {
     fontSize: '18px',
     fontWeight: 'bold',
     color: '#333',
   },
   removeItemButton: {
     backgroundColor: '#ff4d4d',
     color: '#fff',
     border: 'none',
     borderRadius: '4px',
     padding: '5px 10px',
     cursor: 'pointer',
     fontWeight: 'bold',
     marginRight: '10px',
   },
   clearCartButton: {
     backgroundColor: '#ccc',
     color: '#fff',
     border: 'none',
     borderRadius: '4px',
     padding: '10px',
     cursor: 'pointer',
     marginRight: '10px',
   },
   checkoutLink: {
     textDecoration: 'none',
     backgroundColor: '#007bff',
     color: '#fff',
     padding: '10px',
     borderRadius: '4px',
     cursor: 'pointer',
     display: 'inline-block',
   },
 };

export default CartPage;
