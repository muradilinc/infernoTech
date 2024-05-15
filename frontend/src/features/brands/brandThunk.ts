import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../app/axiosApi';
import { Brand } from './brandSlice';
import { BrandMutation } from '../../pages/admin/BrandsAdminPage/model/types';

export const createBrand = createAsyncThunk<void, BrandMutation>(
  'brand/create',
  async (brand) => {
    try {
      const formData = new FormData();
      formData.append('name', brand.name);
      if (brand.logo) {
        formData.append('logo', brand.logo);
      }
      await axiosApi.post('/brands', formData);
    } catch (error) {
      console.log(error);
    }
  },
);

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

interface UpdateBrand {
  id: string;
  brand: BrandMutation;
}

export const updateBrand = createAsyncThunk<void, UpdateBrand>(
  'brand/update',
  async ({ id, brand }) => {
    const formData = new FormData();
    const keys = Object.keys(brand) as (keyof BrandMutation)[];
    keys.forEach((key) => {
      const value = brand[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });
    await axiosApi.patch(`/brands/${id}`, formData);
  },
);

export const deleteBrand = createAsyncThunk<void, string>(
  'brand/delete',
  async (id) => {
    await axiosApi.delete(`/brands/${id}`);
  },
);
