import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const addToCart = createAsyncThunk(
   'cart/addToCart',
   async (product) => {
      try {
         const cartItems = await axios.get('/api/cart')

         if (cartItems.length === 0) {
            await axios.post('/api/cart', product);
         } else {
            const orderId = cartItems[0].orderId;
            const existingItem = cartItems.find((item) => item.productId === product.Id);

            if (existingItem) {
               await axios.put(`/api/cart/${existingItem.id}`, { quantity: existingItem.quantity + 1});
            } else {
               await axios.post('/api/cart', { cartItems: [product] });
            }
         }

         return product;
      } catch (error) {
         throw Error('Failed to add item to cart');
      }
   }
);

export const removeFromCart = createAsyncThunk(
   'cart/removeFromCart',
   async (productId) => {
      try {
         await axios.delete(`/api/cart/${productId}`);

         return productId;
      } catch (error) {
         throw Error('Failed to remove item from cart');
      }
   }
)

export const cartSlice = createSlice({
   name: 'cart',
   initialState: [],
   reducers: {
      // addToCart: (state, action) => {
      //    const product = action.payload;
      //    const existingProduct = state.find((item) => item.id === product.id);
      //    if (existingProduct) {
      //       existingProduct.quantity += 1;
      //    } else {
      //       state.push({ ...product, quantity: 1 });
      //    }
      //    // Call the API to update the cart in the database
      //    axios.post('/api/cart', { cartItems: state });
      // },
      // removeFromCart: (state, action) => {
      //    const productId = action.payload;
      //    state = state.filter((item) => item.id !== productId);
      //    // Call the API to remove the product from the cart in the databse
      //    axios.delete(`/api/cart/${productId}`);
      // },
      updateQuantity: (state, action) => {
         const { productId, quantity } = action.payload;
         const product = state.find((item) => item.id === productId);
         if (product) {
            product.quantity = quantity;
         }
         // Call the API to update the cart in the database
         axios.post('/api/cart', { cartItems: state });
      },
      clearCart: () => [],
   },
   extraReducers: (builder) => {
      builder
         .addCase(addToCart.fullfilled, (state, action) => {
            const product = action.payload;
            const existingProduct = state.find((item) => item.id === product.id);
            if (existingProduct) {
               existingProduct.quantity += 1;
            } else {
               state.push({ ...product, quantity: 1 });
            }
         })
         .addCase(removeFromCart.fullfilled, (state, action) => {
            const productId = action.payload;
            return state.filter((item) => item.id !== productId);
         });
   }
});

export const { updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;