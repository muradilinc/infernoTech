import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../app/axiosApi';
import { Category } from './categoriesSlice';

export const createCategory = createAsyncThunk<void, CategoryMutation>(
  'categories/create',
  async (category) => {
    try {
      const formData = new FormData();
      formData.append('title', category.title);
      if (category.image) {
        formData.append('image', category.image);
      }
      await axiosApi.post('/categories', formData);
    } catch (error) {
      console.log(error);
    }
  },
);

export const getAllCategory = createAsyncThunk<Category[]>(
  'categories/getAll',
  async () => {
    const response = await axiosApi.get<Category[]>('/categories');
    return response.data;
  },
);

export const getCategorySingle = createAsyncThunk<Category, string>(
  'categories/getOne',
  async (id) => {
    const response = await axiosApi.get<Category>(`/categories/${id}`);
    return response.data;
  },
);

interface UpdateCategory {
  id: string;
  category: CategoryMutation;
}

export const updateCategory = createAsyncThunk<void, UpdateCategory>(
  'categories/update',
  async ({ id, category }) => {
    const formData = new FormData();
    const keys = Object.keys(category) as (keyof CategoryMutation)[];
    keys.forEach((key) => {
      const value = category[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });
    await axiosApi.patch(`/categories/${id}`, formData);
  },
);

export const deleteCategory = createAsyncThunk<void, string>(
  'categories/delete',
  async (id) => {
    await axiosApi.delete(`/categories/${id}`);
  },
);
