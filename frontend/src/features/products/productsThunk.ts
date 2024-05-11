import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../app/axiosApi';
import { Product } from './productsSlice';

export const getProductAll = createAsyncThunk<Product[], string | undefined>(
  'products/getAll',
  async (filter) => {
    const response = await axiosApi.get<Product[]>(
      `${!filter ? '/products' : `/products/${filter}`}`,
    );
    return response.data;
  },
);
