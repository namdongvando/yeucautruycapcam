
import { PayloadAction } from '@reduxjs/toolkit';
import { profileApi } from 'api/profileApi';
import { yeucauApi } from 'api/yeucauApi';
import { ServiceForm } from 'models';
import { ResultData, ResultPaging } from 'models/ResultPaging';
import { Examinations, ExaminationsRequest, ExaminationXuLy } from 'models/YeuCau';
import { all, call, fork, put, take, takeEvery, takeLatest } from 'redux-saga/effects';
import { yeucauActions } from './yeucauSlice';

// gọi api o chỗ này
function* handleGet(payload: ExaminationsRequest) {
  try {
    const rs: ResultPaging = yield call(yeucauApi.get, payload);
    yield put(yeucauActions.getSuccess(rs));
  } catch (error: any) {
    console.log(error);
  }
}

function* ReLoadTable() {
  const params: ExaminationsRequest = {
    keyword: "",
    pageIndex: 0,
    pagesNumber: 10
  } as ExaminationsRequest;
  const listData: ResultPaging = yield call(yeucauApi.get, params);
  yield put(yeucauActions.getSuccess(listData));
}


function* handlePut(payload: Examinations) {
  try {
    const rs: Examinations = yield call(yeucauApi.Put, payload);
    yield fork(ReLoadTable);
  } catch (error: any) {
    console.log(error);
  }
}
function* handlePost(payload: Examinations) {
  try {
    const rs: Examinations = yield call(yeucauApi.post, payload);
    yield fork(ReLoadTable);
  } catch (error: any) {
    console.log(error);
  }
}
function* handleGetById(payload: string) {
  try {
    console.log(payload);
    const rs: ResultPaging = yield call(yeucauApi.getById, payload);
    yield put(yeucauActions.getByIdSuccess(rs));

  } catch (error: any) {
    console.log(error);
  }
}
function* handleDelete(payload: string) {
  try {

    console.log(payload);
    const rs: string = yield call(yeucauApi.delete, payload);
    yield put(yeucauActions.deleteSuccess(rs));
    yield fork(ReLoadTable);
  } catch (error: any) {
    console.log(error);
  }
}

function* getYeucauWatcher() {
  while (true) {
    const action: PayloadAction<ExaminationsRequest> = yield take(yeucauActions.get.type);
    yield fork(handleGet, action.payload);
  }

}
function* YeucauWatcherUpdate() {
  while (true) {
    const actionPut: PayloadAction<Examinations> = yield take(yeucauActions.put.type);
    yield fork(handlePut, actionPut.payload);
  }
}
function* YeucauWatcherPost() {
  while (true) {
    const actionPut: PayloadAction<Examinations> = yield take(yeucauActions.post.type);
    yield fork(handlePost, actionPut.payload);

  }
}
function* YeucauWatcherDelete() {
  while (true) {
    const actionDelete: PayloadAction<string> = yield take(yeucauActions.delete.type);
    yield fork(handleDelete, actionDelete.payload);
  }
}

function* handlePostLyDo(payload: ExaminationXuLy) {
  try {
    const rs: ResultData = yield call(yeucauApi.PostLyDo, payload);
    yield fork(ReLoadTable);
  } catch (error: any) {
    console.log(error);
  }
}

function* getXuLyWatcher() {
  while (true) {
    const actionDelete: PayloadAction<ExaminationXuLy> = yield take(yeucauActions.postLyDo.type);
    yield fork(handlePostLyDo, actionDelete.payload);

  }
}

function* getLyDoWatcher() {
  try {
    const rs: ResultData = yield call(yeucauApi.getOptiopsByGroups, "LyDo");
    yield put(yeucauActions.getLyDoSuccess(rs));
  }
  catch (error: any) {
    console.log(error);
  }
}
// lấy danh sách groups
function* getDonViWatcher() {
  try {
    const rs: ResultData = yield call(yeucauApi.getOptiopsByGroups, "DonVi");
    yield put(yeucauActions.getDonViSuccess(rs));
  }
  catch (error: any) {
    console.log(error);
  }
}
function* getDapUngWatcher() {
  try {
    const rs: ResultData = yield call(yeucauApi.getOptiopsByGroups, "DapUng");
    yield put(yeucauActions.getDSDapUngSuccess(rs));
  }
  catch (error: any) {
    console.log(error);
  }
}
// khi có sự kiện thì gọi 
export function* yeucauSaga() {
  console.log("profileSaga");
  yield all([fork(getXuLyWatcher), fork(getDapUngWatcher), fork(getYeucauWatcher), fork(getDonViWatcher), fork(getLyDoWatcher), fork(YeucauWatcherPost), fork(YeucauWatcherUpdate), fork(YeucauWatcherDelete)]);
  console.log("End profileSaga");
}


