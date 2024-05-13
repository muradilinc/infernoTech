import { createSlice } from '@reduxjs/toolkit';
import { getBrandAll, getBrandSingle } from './brandThunk';
import { RootState } from '../../app/store/store';
import { Category } from '../categories/categoriesSlice';

export interface Brand {
  _id: string;
  name: string;
  logo: string;
  categories: Category[];
  productLength: number;
}

interface BrandState {
  brands: Brand[];
  brand: Brand | null;
  brandsLoading: boolean;
}

const initialState: BrandState = {
  brands: [],
  brand: null,
  brandsLoading: false,
};

const brandSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBrandAll.pending, (state) => {
      state.brandsLoading = true;
    });
    builder.addCase(getBrandAll.fulfilled, (state, { payload: brands }) => {
      state.brandsLoading = false;
      state.brands = brands;
    });
    builder.addCase(getBrandAll.rejected, (state) => {
      state.brandsLoading = false;
    });
    builder.addCase(getBrandSingle.pending, (state) => {
      state.brandsLoading = true;
    });
    builder.addCase(getBrandSingle.fulfilled, (state, { payload: brand }) => {
      state.brandsLoading = false;
      state.brand = brand;
    });
    builder.addCase(getBrandSingle.rejected, (state) => {
      state.brandsLoading = false;
    });
  },
});

export const brandReducer = brandSlice.reducer;
export const selectBrands = (state: RootState) => state.brands.brands;
export const selectBrand = (state: RootState) => state.brands.brand;
