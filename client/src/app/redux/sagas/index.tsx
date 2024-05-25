import axios from 'axios';
import { all, fork, takeEvery } from 'redux-saga/effects';

// axios.defaults.baseURL = process.env.REACT_APP_BASIC_SERVER_URL;

export default function* rootSaga() {
    // yield all([fork(authSaga), fork(postSaga), fork(commentSaga), fork(visitorSaga)]);
    yield all([]);
} //여러값을 반환하게 하는 최신문법함수
