import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { add } from 'date-fns';
import { User, OptionsYeuCau, ExaminationsRequest, LoginPayload, ListResponse, ServiceForm } from 'models';
import { ResultData, ResultPaging } from 'models/ResultPaging';
import { Examinations, ExaminationXuLy } from 'models/YeuCau';


export interface YeucauState {
  isLoading: Boolean;
  ListExamination: Examinations[];
  DataPaging: ResultPaging;
  DataDetail: any;
  error?: string;
  DSLyDo: OptionsYeuCau[];
  DSDonVi: OptionsYeuCau[];
  DSDapUng: OptionsYeuCau[];
}
const initialState: YeucauState = {
  isLoading: false,
  DataDetail: null,
  DataPaging: {
    pageIndex: 1,
    pageSize: 10,
    totalPage: 0,
    totalSize: 0,
    data: [],
  },
  ListExamination: [],
  DSLyDo: [],
  DSDonVi: [],
  DSDapUng: [],
  error: undefined
};

const yeucauSlice = createSlice({
  name: 'yeucau',
  initialState,
  reducers: {
    getById(state, action: PayloadAction<string>) {
      state.isLoading = true;
      state.error = undefined;
    },
    delete(state, action: PayloadAction<string>) {
      console.log(action);
      state.isLoading = true;
      state.error = undefined;
    },
    deleteSuccess(state, action: PayloadAction<string>) {
      console.log(action);
      state.isLoading = true;
      state.error = undefined;
    },
    get(state, action: PayloadAction<ExaminationsRequest>) {
      state.isLoading = true;
      state.error = undefined;
    },
    getLyDo(state) {
      state.isLoading = true;
      state.error = undefined;
    },
    getDonVi(state) {
      state.isLoading = true;
      state.error = undefined;
    },
    getLyDoSuccess(state, action: PayloadAction<ResultData>) {
      state.isLoading = true;
      state.error = undefined;
      state.DSLyDo = action.payload.data;
    },
    getDonViSuccess(state, action: PayloadAction<ResultData>) {
      state.isLoading = true;
      state.error = undefined;
      state.DSDonVi = action.payload.data;
    },
    put(state, action: PayloadAction<Examinations>) {
      state.isLoading = true;
      state.error = undefined;
    },
    post(state, action: PayloadAction<Examinations>) {
      state.isLoading = true;
      state.error = undefined;
    },
    postLyDo(state, action: PayloadAction<ExaminationXuLy>) {
      state.isLoading = true;
      state.error = undefined;
    },
    PutSuccess(state, action: PayloadAction<ExaminationsRequest>) {
      state.isLoading = true;
      state.error = undefined;
    },
    getByIdSuccess(state, action: PayloadAction<any>) {
      state.isLoading = false;
      state.DataDetail = action.payload.data;
      state.error = "";
    },
    getDSDapUng(state) {
      state.isLoading = true;
      state.error = undefined;
    },
    getDSDapUngSuccess(state, action: PayloadAction<ResultData>) {
      state.isLoading = false;
      state.DSDapUng = action.payload.data;
      state.error = "";
    },

    getSuccess(state, action: PayloadAction<ResultPaging>) {
      state.isLoading = false;
      state.ListExamination = action.payload.data;
      state.DataPaging = action.payload;
      state.error = "saveSuccess";
    },
    postFailed(state, action: PayloadAction<any>) {
      state.isLoading = false;
      state.error = "401: saveFailed";
    }
  },
});

export const yeucauActions = yeucauSlice.actions;
export const selectExaminationsList = (state: RootState) => state.yeucau.ListExamination;
export const examinationsDataPaging = (state: RootState) => state.yeucau.DataPaging;
export const examinationsDataDetail = (state: RootState) => state.yeucau.DataDetail;
const yeucauReducer = yeucauSlice.reducer;
export default yeucauReducer;
