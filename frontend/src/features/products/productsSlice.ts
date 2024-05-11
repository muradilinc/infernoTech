import { createSlice } from '@reduxjs/toolkit';
import { getProductAll } from './productsThunk';
import { RootState } from '../../app/store/store';

export interface Product {
  _id: string;
  category: string;
  brand: string;
  name: string;
  price: string;
  description: string;
  image: string;
}

interface ProductsState {
  products: Product[];
  productsLoading: boolean;
}

const initialState: ProductsState = {
  products: [],
  productsLoading: false,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProductAll.pending, (state) => {
      state.productsLoading = true;
    });
    builder.addCase(getProductAll.fulfilled, (state, { payload: products }) => {
      state.productsLoading = false;
      state.products = products;
    });
    builder.addCase(getProductAll.rejected, (state) => {
      state.productsLoading = false;
    });
  },
});

export const productsReducer = productsSlice.reducer;
export const selectProducts = (state: RootState) => state.products.products;
