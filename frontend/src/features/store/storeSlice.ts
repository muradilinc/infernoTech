import { Product } from '../products/productsSlice';
import { createSlice } from '@reduxjs/toolkit';
import { getSingleStore } from './storeThunk';
import { RootState } from '../../app/store/store';

export interface Store {
  _id: string;
  displayName: string;
  email: string;
}


interface StoreState {
  store: Store | null;
  products: Product[];
  storeLoading: boolean;
}

const initialState: StoreState = {
  store: null,
  products: [],
  storeLoading: false,
};

const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSingleStore.pending, (state) => {
      state.storeLoading = true;
    });
    builder.addCase(getSingleStore.fulfilled, (state, { payload: store }) => {
      state.storeLoading = false;
      state.store = store;
    });
  },
});

export const storeReducer = storeSlice.reducer;
export const selectStore = (state: RootState) => state.store.store;