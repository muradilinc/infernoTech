import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../app/axiosApi';

export const getAllCategory = createAsyncThunk(
  'categories/getAll',
  async () => {
    const response = await axiosApi.get('/categories');
    return response.data;
  },
);
