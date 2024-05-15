import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../app/axiosApi';
import { Product } from './productsSlice';
import { ProductMutation } from '../../pages/admin/ProductsAdminPage/model/types';

export const createProduct = createAsyncThunk<void, ProductMutation>(
  'products/create',
  async (product) => {
    try {
      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('price', product.price);
      formData.append('description', product.description);
      formData.append('category', product.category);
      formData.append('brand', product.brand);
      if (product.image) {
        formData.append('image', product.image);
      }
      formData.append(
        'characteristics',
        JSON.stringify(product.characteristics),
      );
      await axiosApi.post('/products', formData);
    } catch (error) {
      console.log(error);
    }
  },
);

export const getProductAll = createAsyncThunk<Product[], string | undefined>(
  'products/getAll',
  async (filter) => {
    const response = await axiosApi.get<Product[]>(
      `${!filter ? '/products' : `/products/${filter}`}`,
    );
    return response.data;
  },
);

export const getProductSingle = createAsyncThunk<Product, string>(
  'products/getSingle',
  async (id) => {
    const response = await axiosApi.get(`/products/${id}`);
    return response.data;
  },
);

interface UpdateProduct {
  id: string;
  product: ProductMutation;
}

export const updateProduct = createAsyncThunk<void, UpdateProduct>(
  'products/update',
  async ({ id, product }) => {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price);
    formData.append('description', product.description);
    formData.append('category', product.category);
    formData.append('brand', product.brand);
    if (product.image) {
      formData.append('image', product.image);
    }
    formData.append('characteristics', JSON.stringify(product.characteristics));
    await axiosApi.patch(`/products/${id}`, formData);
  },
);

export const deleteProduct = createAsyncThunk<void, string>(
  'products/delete',
  async (id) => {
    await axiosApi.delete(`/products/${id}`);
  },
);
