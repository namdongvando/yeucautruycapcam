
import { profileApi } from 'api/profileApi';
import { ServiceForm } from 'models';
import { all, call, fork, put, take, takeEvery, takeLatest } from 'redux-saga/effects';
import { profileActions } from './profileSlice';

// gọi api o chỗ này
function* handleGet() {
  try {
    // console.log("call ");
    const rs: ServiceForm[] = yield call(profileApi.get);
    // console.log(rs);
    // console.log("end call ");
    yield put(profileActions.postSuccess(rs));
  } catch (error: any) {
    console.log(error);
  }
}
function* getUserWatcher() {
  yield takeEvery(profileActions.get, handleGet);
}
// khi có sự kiện thì gọi 
export function* profileSaga() {
  // console.log("profileSaga"); 
  yield all([fork(getUserWatcher)])
  // console.log("End profileSaga"); 
}


