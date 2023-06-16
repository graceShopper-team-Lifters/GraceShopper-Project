import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
   'products/fetchProducts',
   async () => {
      const response = await axios.get('/api/products');
      return response.data;
   }
);

export const fetchProductDetails = createAsyncThunk(
   'products/fetchProductDetails',
   async (id) => {
      const response = await axios.get(`/api/products/${id}`);
      return response.data;
   }
)

const productsSlice = createSlice({
   name: 'products',
   initialState: {
      items: [],
      loading: false,
      error: null,
      details: null,
      detailsLoading: false,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         })
         .addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
         })
         .addCase(fetchProductDetails.pending, (state) => {
            state.detailsLoading = true;
            state.error = null;
         })
         .addCase(fetchProductDetails.fulfilled, (state, action) => {
            state.detailsLoading = false;
            state.details = action.payload;
         })
         .addCase(fetchProductDetails.rejected, (state, action) => {
            state.detailsLoading = false;
            state.error = action.error.message;
         });
   },
});

export default productsSlice.reducer;