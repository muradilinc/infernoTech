import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../app/axiosApi';
import { Store } from './storeSlice';

export const getSingleStore = createAsyncThunk<Store, string>(
  'store/getSingle',
  async (id) => {
    const response = await axiosApi.get<Store | null>(`/stores/${id}`);
    if (!response.data) {
      throw new Error('Not found!');
    }
    return response.data;
  },
);