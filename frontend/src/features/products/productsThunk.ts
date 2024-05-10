import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../app/axiosApi';
import { Product } from './productsSlice';

export const getProductAll = createAsyncThunk<Product[]>(
  'products/getAll',
  async () => {
    const response = await axiosApi.get<Product[]>('/products');
    return response.data;
  },
);
