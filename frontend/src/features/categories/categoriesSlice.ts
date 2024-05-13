import { createSlice } from '@reduxjs/toolkit';
import { getAllCategory } from './categoriesThunk';
import { RootState } from '../../app/store/store';

export interface Category {
  _id: string;
  title: string;
  image: string;
  productLength: number;
}

interface CategoriesState {
  categories: Category[];
  categoriesLoading: boolean;
  categoriesError: null;
}

const initialState: CategoriesState = {
  categories: [],
  categoriesLoading: false,
  categoriesError: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCategory.pending, (state) => {
      state.categoriesLoading = true;
    });
    builder.addCase(
      getAllCategory.fulfilled,
      (state, { payload: categories }) => {
        state.categoriesLoading = false;
        state.categories = categories;
      },
    );
    builder.addCase(getAllCategory.rejected, (state) => {
      state.categoriesLoading = false;
    });
  },
});

export const categoriesReducer = categoriesSlice.reducer;
export const selectCategories = (state: RootState) =>
  state.categories.categories;
