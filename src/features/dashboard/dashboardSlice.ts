import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { add } from 'date-fns';
import { User, LoginPayload, ListResponse, ServiceForm } from 'models';

export interface userProfile {
    isLoading: Boolean; 
    userInfor?: User;
    ListServicesForm : ServiceForm[];
    error?: string;
}

const initialState: userProfile = {
    isLoading: false, 
    userInfor: undefined,
    ListServicesForm: [],
    error: undefined
};

const profileSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    get(state) {
      state.isLoading = true;
      state.error = undefined;
    } 
  },
});

export const profileActions = profileSlice.actions;
export const selectListServicesForm = (state:RootState) => state.profile.ListServicesForm;
const profileReducer = profileSlice.reducer;
export default profileReducer;
