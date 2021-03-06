import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, LoginPayload } from 'models';

export interface AuthState {
  isLoading: Boolean;
  logging?: Boolean;
  currentUser?: User;
  error?: string;
}

const initialState: AuthState = {
  isLoading: false,
  logging: false,
  currentUser: undefined,
  error: undefined
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginPayload>) {
      state.logging = true;
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.logging = false;
      state.isLoading = true;
      state.currentUser = action.payload;
    },
    loginFailed(state, action: PayloadAction<any>) {
      state.logging = false;
    },
    logout(state) {
      state.isLoading = false;
      state.currentUser = undefined;
    },
  },
});

export const authActions = authSlice.actions;

export const selectIsLoading = (state: any) => state.auth.isLoading;
export const selectIsLogging = (state: any) => state.auth.logging;

const authReducer = authSlice.reducer;
export default authReducer;
