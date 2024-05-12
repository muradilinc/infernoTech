import { createSlice } from '@reduxjs/toolkit';
import { getProductAll, getProductSingle } from './productsThunk';
import { RootState } from '../../app/store/store';
import { Brand } from '../brands/brandSlice';
import { Category } from '../categories/categoriesSlice';

interface Characteristic {
  title: string;
  characteristic: [
    {
      name: string;
      value: string;
    },
  ];
}

export interface Product {
  _id: string;
  category: Category;
  brand: Brand;
  name: string;
  price: string;
  description: string;
  image: string;
  characteristics: Characteristic[];
}

interface ProductsState {
  product: Product | null;
  products: Product[];
  productsLoading: boolean;
}

const initialState: ProductsState = {
  product: null,
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
    builder.addCase(getProductSingle.pending, (state) => {
      state.productsLoading = true;
    });
    builder.addCase(
      getProductSingle.fulfilled,
      (state, { payload: product }) => {
        state.productsLoading = false;
        state.product = product;
      },
    );
    builder.addCase(getProductSingle.rejected, (state) => {
      state.productsLoading = false;
    });
  },
});

export const productsReducer = productsSlice.reducer;
export const selectProducts = (state: RootState) => state.products.products;
export const selectProduct = (state: RootState) => state.products.product;
