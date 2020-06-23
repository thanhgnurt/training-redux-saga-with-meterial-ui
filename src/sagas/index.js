import {
  fork,
  take,
  call,
  put,
  delay,
  takeLatest,
  select,
  takeEvery,
} from "redux-saga/effects";
import * as taskTypes from "./../constants/task";
import { getList, addTask, updateTask, deleteTask } from "./../apis/task";
import { STATUS_CODE, STATUSES } from "./../constants/index";
import {
  fetchListTaskSuccess,
  fetchListTaskFailed,
  addTaskSuccess,
  addTaskFailed,
  fetchListTask,
  updateTaskSuccess,
  updateTaskFailed,
  deleteTaskSuccess,
  deleteTaskFailed,
} from "../actions/task";
import { showLoading, hideLoading } from "./../actions/ui";
import { hideModal } from "../actions/modal";

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
    const action = yield take(taskTypes.FETCH_TASK);
    const { params } = action.payload;
    yield put(showLoading());
    const resp = yield call(getList, params);
    const { status, data } = resp;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(fetchListTaskSuccess(data));
    } else {
      yield put(fetchListTaskFailed(data));
    }
    yield delay(500);
    yield put(hideLoading());
  }
}

function* filterTaskSaga({ payload }) {
  yield delay(500);
  const { keyword } = payload;
  yield put(fetchListTask({ q: keyword }));
}

function* addTaskSaga({ payload }) {
  const { tittle, description } = payload;
  yield put(showLoading());
  const resp = yield call(addTask, {
    tittle,
    description,
    status: STATUSES[0].value,
  });
  const { status, data } = resp;
  if (status === STATUS_CODE.CREATED) {
    yield put(addTaskSuccess(data));
    yield put(hideModal());
  } else {
    yield put(addTaskFailed(data));
  }
  yield delay(500);
  yield put(hideLoading());
}

function* updateTaskSaga({ payload }) {
  const { tittle, description, status } = payload;
  const taskEditting = yield select((state) => state.task.taskEditting);
  yield put(showLoading());
  const resp = yield call(
    updateTask,
    {
      tittle,
      description,
      status,
    },
    taskEditting.id
  );
  const { status: statusCode, data } = resp;
  if (statusCode === STATUS_CODE.SUCCESS) {
    yield put(updateTaskSuccess(data));
    yield put(hideModal());
  } else {
    yield put(updateTaskFailed(data));
  }
  yield delay(500);
  yield put(hideLoading());
}

function* deleteTaskSaga({payload}) {
  const {id} = payload;
  yield put(showLoading());
  const resp = yield call(deleteTask, id);
  const { data, status: statusCode } = resp;
  if ((statusCode === STATUS_CODE.SUCCESS)) {
    yield put(deleteTaskSuccess(id));
    yield put(hideModal());
  } else {
    yield put(deleteTaskFailed(data));
  }
  yield delay(500);
  yield put(hideLoading());
}

function* rootSaga() {
  yield fork(watchFetchListTaskAction);
  yield takeLatest(taskTypes.FILTER_TASK, filterTaskSaga);
  yield takeEvery(taskTypes.ADD_TASK, addTaskSaga);
  yield takeLatest(taskTypes.UPDATE_TASK, updateTaskSaga);
  yield takeLatest(taskTypes.DELETE_TASK, deleteTaskSaga);
}

export default rootSaga;
