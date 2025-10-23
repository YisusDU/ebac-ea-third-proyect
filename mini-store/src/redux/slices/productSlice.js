import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from '../../api';

// Operaciones asíncronas
const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await api.get('/products');
    return response.data
});

//  Estados de la petición: idle, pending, fulfilled, rejected 
const productSlice = createSlice({
    name: 'products',
    initialState: {
        items : [],
        status: 'idle',
        error: null,
    },
    reducers:{},
    // Los extrareducers se utilizan para manejar ops asíncronas
    extraReducers: (builder) => {
        builder
        .addCase(fetchProducts.pending, (state) => {
            state.status ="loading";
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.status ="succeeded";
            state.items = action.payload;
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            state.status ="failed";
            state.items = action.error.message;
        })
    }
});

export const  { setProducts }  = productSlice.actions;
export default productSlice.reducer;

