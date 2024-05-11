import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../app/axiosApi';
import { Brand } from './brandSlice';

export const getBrandAll = createAsyncThunk<Brand[]>(
  'brand/getAll',
  async () => {
    const response = await axiosApi.get<Brand[]>('/brands');
    return response.data;
  },
);
