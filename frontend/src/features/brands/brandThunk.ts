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

export const getBrandSingle = createAsyncThunk<Brand, string>(
  'brand/getSingle',
  async (id) => {
    const response = await axiosApi.get<Brand>(`/brands/${id}`);
    return response.data;
  },
);
