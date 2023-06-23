import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
   'products/fetchProducts',
   async () => {
      try {
         const { data } = await axios.get('/api/products/');
         return data;
     } catch (err) {
         console.log(err);
     }
   }
);

//PATIENCE
export const fetchPatienceProducts = createAsyncThunk(
   'products/fetchPatienceProducts',
   async () => {
      try {
         const { data } = await axios.get('/api/products/patience');
         return data;
     } catch (err) {
         console.log(err);
     }
   }
);

//CHARISMA
export const fetchCharismaProducts = createAsyncThunk(
   'products/fetchCharismaProducts',
   async () => {
      try {
         const { data } = await axios.get('/api/products/charisma');
         return data;
     } catch (err) {
         console.log(err);
     }
   }
);

//ATTITUDE
export const fetchAttitudeProducts = createAsyncThunk(
   'products/fetchAttitudeProducts',
   async () => {
      try {
         const { data } = await axios.get('/api/products/attitude');
         return data;
     } catch (err) {
         console.log(err);
     }
   }
);

//DISCIPLINE
export const fetchDisciplineProducts = createAsyncThunk(
   'products/fetchDisciplineProducts',
   async () => {
      try {
         const { data } = await axios.get('/api/products/discipline');
         return data;
     } catch (err) {
         console.log(err);
     }
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
   initialState: [],
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchPatienceProducts.fulfilled, (state, action) => {
            return action.payload;
         })
         .addCase(fetchCharismaProducts.fulfilled, (state, action) => {
            return action.payload;
         })
         .addCase(fetchAttitudeProducts.fulfilled, (state, action) => {
            return action.payload;
         })
         .addCase(fetchDisciplineProducts.fulfilled, (state, action) => {
            return action.payload;
         });
   },
});

export const selectProducts = (state) => {
   return state.products;
}

export default productsSlice.reducer;