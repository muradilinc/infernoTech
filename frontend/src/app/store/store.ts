import { configureStore } from '@reduxjs/toolkit';
import { categoriesReducer } from '../../features/categories/categoriesSlice';
import { productsReducer } from '../../features/products/productsSlice';
import { brandReducer } from '../../features/brands/brandSlice';
import { storeReducer } from '../../features/store/storeSlice';
import { authReducer } from '../../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productsReducer,
    brands: brandReducer,
    store: storeReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
