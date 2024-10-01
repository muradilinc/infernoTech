import { AuthResponse, GlobalError, User } from '../../@types/auth';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login, register } from './authThunk';
import { RootState } from '../../app/store/store';

interface AuthState {
  user: User | null;
  registerLoading: boolean;
  registerError: GlobalError | null;
  loginLoading: boolean;
  loginError: GlobalError | null;
}

const initialState: AuthState = {
  user: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.registerLoading = true;
    });
    builder.addCase(register.fulfilled, (state, { payload: data }: PayloadAction<AuthResponse>) => {
      state.registerLoading = false;
      state.user = data.user;
    });
    builder.addCase(register.rejected, (state, { payload: error }: PayloadAction<GlobalError | undefined>) => {
      state.registerLoading = false;
      state.registerError = error || null;
    });
    builder.addCase(login.pending, (state) => {
      state.loginLoading = true;
    });
    builder.addCase(login.fulfilled, (state, { payload: data }: PayloadAction<AuthResponse>) => {
      state.loginLoading = false;
      state.user = data.user;
    });
    builder.addCase(login.rejected, (state, { payload: error }: PayloadAction<GlobalError | undefined>) => {
      state.loginLoading = false;
      state.loginError = error || null;
    });
  },
});

export const authReducer = authSlice.reducer;
export const selectUser = (state: RootState) => state.auth.user;
