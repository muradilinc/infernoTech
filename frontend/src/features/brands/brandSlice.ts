import { createSlice } from '@reduxjs/toolkit';
import { getBrandAll } from './brandThunk';
import { RootState } from '../../app/store/store';

export interface Brand {
  name: string;
  logo: string;
}

interface BrandState {
  brands: Brand[];
  brandsLoading: boolean;
}

const initialState: BrandState = {
  brands: [],
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
  },
});

export const brandReducer = brandSlice.reducer;
export const selectBrands = (state: RootState) => state.brands.brands;
