import { authSaga } from "features/auth/authSaga";
import { profileSaga } from "features/profile/profileSaga";
import { yeucauSaga } from "features/yeucau/yeucauSaga";
import { all } from "redux-saga/effects";

export default function* rootSaga() {
    yield all([
        authSaga(),
        profileSaga(),
        yeucauSaga(),
    ])
} 