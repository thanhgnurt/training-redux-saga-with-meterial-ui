import {
  fork,
  take,
  call,
  put,
  delay,
  takeLatest,
  select,
} from "redux-saga/effects";
import * as taskTypes from "./../constants/task";
import { getList } from "./../apis/task";
import { STATUS_CODE } from "./../constants/index";
import { fetchListTaskSuccess, fetchListTaskFailed } from "../actions/task";
import { showLoading, hideLoading } from "./../actions/ui";

/*
B1: thuc thi action fetch list task
B2: Goi api
  B2.1: hien thi thanh tien trinh
B3: kiem tra status code
  neu thanh cong
  neu that bai
B4: tat loading
B5: thuc thi cong viec tiep theo
*/

function* watchFetchListTaskAction() {
  while (true) {
    yield take(taskTypes.FETCH_TASK);
    yield put(showLoading());
    const resp = yield call(getList);

    const { status, data } = resp;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(fetchListTaskSuccess(data));
    } else {
      yield put(fetchListTaskFailed(data));
    }
    yield delay(700);
    yield put(hideLoading());
  }
}

function* filterTaskSaga({ payload }) {
  yield delay(500);
  const { keyword } = payload;
  const list = yield select((state) => state.task.listTask);
  const filteredTask = list.filter((task) =>
    task.tittle.trim().toLowerCase().includes(keyword.trim().toLowerCase())
  );
  yield put(fetchListTaskSuccess(filteredTask))
}

function* rootSaga() {
  yield fork(watchFetchListTaskAction);
  yield takeLatest(taskTypes.FILTER_TASK, filterTaskSaga);
}

export default rootSaga;
