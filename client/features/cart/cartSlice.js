import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//FETCH
export const fetchCartAsync = createAsyncThunk('cart', async (username) => {
   try {
      const { data } = await axios.get('/api/cart', { params: { username } });
      return data;
   } catch (err) {
      throw new Error('Failed to fetch cart');
   }
});

//ADD
export const addToCart = createAsyncThunk(
   'cart/addToCart',
   async ({ username, productId }) => {
      try {
         const response = await axios.post('/api/cart', { username, productId });
         return response.data;
      } catch (error) {
         throw Error('Failed to add item to cart');
      }
   }
);

//UPDATE
export const updateQuantity = createAsyncThunk(
   'cart/updateQuantity',
   async ({ orderId, username, productId, quantity }) => {
      try {
         const response = await axios.put(`/api/cart/${orderId}`, { username, productId, quantity });
         return response.data;
      } catch (error) {
         throw Error('Failed to update the quantity of items in the cart');
      }
   }
);

//REMOVE
export const removeFromCart = createAsyncThunk(
   'cart/removeFromCart',
   async ({ username, productId, itemId }) => {
      try {
         await axios.delete(`/api/cart/${itemId}`, { params: { username, productId } });
      } catch (error) {
         throw Error('Failed to remove item from cart');
      }
   }
);

//CLEAR
export const clearCart = createAsyncThunk(
   'cart/clearCart',
   async ({ username, orderId }) => {
      try {
         await axios.delete(`/api/cart/clear/${orderId}`, { params: { username } });
      } catch (error) {
         throw Error('Failed to clear the cart');
      }
   }
);

//CHECKOUT
export const handleCheckoutAsync = createAsyncThunk(
   "cart/handleCheckout",
   async ({ orderId, username }) => {
      try {
         const { data } = await axios.post('/api/cart/checkout', { orderId, username });
         return data;
      } catch (error) {
         throw Error('Failed to checkout');
      }
   }
);

export const cartSlice = createSlice({
   name: 'cart',
   initialState: [],
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchCartAsync.fulfilled, (state, action) => {
            return action.payload;
         })
         .addCase(addToCart.fulfilled, (state, action) => {
            const orderItem = action.payload;
            const existingItem = state.filter((item) => item.id === orderItem.id);
            if (existingItem) {
               const otherItems = state.filter((item) => item.id !== existingItem.id);
               existingItem.quantity += 1;
               existingItem.total = existingItem.quantity * existingItem.price;
               return [...otherItems, existingItem];
            } else {
               return [...state, action.payload];
            }
         })
         .addCase(updateQuantity.fulfilled, (state, action) => {
            const updatedResponse = action.payload;
            if (updatedResponse.name) {
               const updatedItem = updatedResponse
               const otherItems = state.filter((item) => item.id !== updatedItem.id);
               return [...otherItems, updatedItem];
            } else {
               const deletedItemId = updatedResponse;
               const otherItems = state.filter((item) => item.id !== deletedItemId);
               return otherItems;
            }
         })
         .addCase(clearCart.fulfilled, (state, action) => {
            return [];
         })
         .addCase(handleCheckoutAsync.fulfilled, (state, action) => {
            return action.payload; // Should return bought items
         });
   }
});

export const selectCartItems = (state) => {
   return state.cart;
}
export default cartSlice.reducer;