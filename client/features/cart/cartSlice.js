import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCartAsync = createAsyncThunk('cart', async (userId) => {
   try {
       const { data } = await axios.get('/api/cart', userId);
       return data;
   } catch (err) {
       console.log(err);
   }
});

export const addToCart = createAsyncThunk(
   'cart/addToCart',
   async ({ userId , product }) => {
      try {
         const response = await axios.post('/api/cart', { userId, product });
         return response.data;
      } catch (error) {
         throw Error('Failed to add item to cart');
      }
   }
);

export const removeFromCart = createAsyncThunk(
   'cart/removeFromCart',
   async ({ userId, orderItemId }) => {
      try {
         await axios.delete(`/api/cart/${orderItemId}`, { userId });

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
      // updateQuantity: (state, action) => {
      //    const { productId, quantity } = action.payload;
      //    const product = state.find((item) => item.id === productId);
      //    if (product) {
      //       product.quantity = quantity;
      //    }
      //    // Call the API to update the cart in the database
      //    axios.post('/api/cart', { cartItems: state });
      // },
      // clearCart: () => [],
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchCartAsync.fulfilled, (state, action) => {
            return action.payload;
         })
         .addCase(addToCart.fulfilled, (state, action) => {
            return [...state, action.payload];
         })
         .addCase(removeFromCart.fulfilled, (state, action) => {
            const productId = action.payload;
            return state.filter((item) => item.id !== productId);
         });
   }
});

export const selectCart = (state) => {
   return state.cartItems;
}
export default cartSlice.reducer;