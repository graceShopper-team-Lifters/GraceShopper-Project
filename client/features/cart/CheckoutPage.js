import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCartAsync, handleCheckoutAsync, selectCartItems } from "./cartSlice";

const CheckoutPage = () => {
   const dispatch = useDispatch();
   const username = useSelector((state) => state.auth.me.username);
   const orderItems = useSelector(selectCartItems);

   const [orderPlaced, setOrderPlaced] = useState(false);
   const [isLoading, setIsLoading] = useState(false);

   useEffect(() => {
      if (!orderPlaced) {
         dispatch(fetchCartAsync(username));
      }
   }, [dispatch, username, orderPlaced])

   const handleCheckout = (orderId, username) => {
      setIsLoading(true);
      dispatch(handleCheckoutAsync({ orderId, username }));
         setTimeout(() => {
         setIsLoading(false);
         setOrderPlaced(true);
      }, 1500);
   };

   if (isLoading) {
      return (
         <div style={styles.container}>
            <h1 style={styles.title}>Loading...</h1>
         </div>
      );
   }

   if (orderPlaced) {
      return (
         <div style={styles.container}>
            <h1 style={styles.title}>Order Placed!</h1>
            <h2 style={styles.title}>Thank you for your purchase, {username}!</h2>
            <p>
               <Link to='/home' style={styles.backToShoppingLink}>
                  Continue Shopping
               </Link>
            </p>
            <h2 style={styles.orderTitle}>Order Summary:</h2>
            <h3>Order #{orderItems[0].orderId}</h3>
            <ul style={styles.itemList}>
               {orderItems && orderItems.length > 0 && orderItems.map((item) => (
                  <li key={item.id} style={styles.item}>
                     <h2 style={styles.itemName}>{item.name}</h2>
                     <p style={styles.itemQuantityLabel}>Quantity: {item.quantity}</p>
                     <h4 style={styles.itemPrice}>Price: ${item.price / 100}</h4>
                     <h2 style={styles.itemTotal}>Total: ${item.total / 100}</h2>
                  </li>
               ))}
            </ul>
         </div>
      );
   }

   return (
      <div style={styles.container}>
         <h1 style={styles.title}>Checkout</h1>
         {orderItems.length === 0 ? (
            <p style={styles.emptyMessage}>Your cart is empty.</p>
         ) : (
            <>
               <h2 style={styles.orderTitle}>Cart Summary:</h2>
               {!orderPlaced && (
                  <h3>Order Status: Pending</h3>
               )}
               <ul style={styles.itemList}>
                  {orderItems.map((item) => (
                     <li key={item.id} style={styles.item}>
                        <p style={styles.itemName}>{item.name}</p>
                        <p style={styles.itemQuantityLabel}>Quantity: {item.quantity}</p>
                        <h4 style={styles.itemPrice}>Price: ${item.price / 100}</h4>
                        <h2 style={styles.itemTotal}>Total: ${item.total / 100}</h2>
                     </li>
                  ))}
               </ul>
               <button onClick={() => handleCheckout(orderItems[0].orderId, username)} style={styles.placeOrderButton}>Place Order</button>
            </>
         )}
         <p>
            <Link to='/cart' style={styles.backToCartLink}>Go back to Cart</Link>
         </p>
      </div>
   );
};

const styles = {
   container: {
      padding: "20px",
      backgroundColor: "#f8f8f8",
      fontFamily: "Arial, sans-serif",
   },
   title: {
      fontSize: "24px",
      marginBottom: "10px",
      color: "#333",
      textAlign: "center",
      textTransform: "uppercase",
   },
   emptyMessage: {
      fontSize: "18px",
      color: "#666",
      textAlign: "center",
   },
   orderTitle: {
      fontSize: "20px",
      marginBottom: "10px",
      color: "#333",
      textTransform: "uppercase",
      borderBottom: "1px solid #ccc",
      paddingBottom: "10px",
   },
   itemList: {
      listStyle: "none",
      padding: 0,
      margin: "10px 0",
   },
   item: {
      marginBottom: "20px",
      padding: "10px",
      backgroundColor: "#fff",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
   },
   itemName: {
      fontSize: "18px",
      marginBottom: "5px",
      color: "#333",
   },
   itemQuantityLabel: {
      fontSize: "16px",
      marginBottom: "5px",
      color: "#666",
      display: "inline-block",
   },
   itemPrice: {
      fontSize: "16px",
      marginBottom: "5px",
      color: "#666",
   },
   itemTotal: {
      fontSize: "18px",
      fontWeight: "bold",
      color: "#333",
   },
   placeOrderButton: {
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      padding: "10px 20px",
      cursor: "pointer",
      fontWeight: "bold",
      marginRight: "10px",
   },
   backToCartLink: {
      textDecoration: "none",
      backgroundColor: "#ff4d4d",
      color: "#fff",
      padding: "10px",
      borderRadius: "4px",
      cursor: "pointer",
      display: "inline-block",
   },
   backToShoppingLink: {
      textDecoration: "none",
      backgroundColor: "#007bff",
      color: "#fff",
      padding: "10px",
      borderRadius: "4px",
      cursor: "pointer",
      display: "inline-block",
   },
};

export default CheckoutPage;