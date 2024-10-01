import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../app/axiosApi';
import { AuthResponse, GlobalError, LoginMutation, RegisterMutation } from '../../@types/auth';
import { isAxiosError } from 'axios';

export const register = createAsyncThunk<
  AuthResponse,
  RegisterMutation,
  { rejectValue: GlobalError }
>(
  'auth/register',
  async (registerMutation, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post('/users/', registerMutation);
      return response.data;
    } catch (error) {
      if (
        isAxiosError(error) &&
        error.response &&
        error.response.status === 422
      ) {
        return rejectWithValue(error.response.data);
      }

      throw error;
    }
  },
);

export const login = createAsyncThunk<
  AuthResponse,
  LoginMutation,
  { rejectValue: GlobalError }
>(
  'auth/login',
  async (loginMutation, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post('/users/sessions', loginMutation);
      return response.data;
    } catch (error) {
      if (
        isAxiosError(error) &&
        error.response &&
        error.response.status === 422
      ) {
        return rejectWithValue(error.response.data);
      }

      throw error;
    }
  },
);