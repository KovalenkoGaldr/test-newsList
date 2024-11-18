import axios, { AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  loadMessagesFailure,
  loadMessagesSuccess,
  MESSAGES_LOAD_REQUEST,
} from "../actions/messagesActions";

function* loadMessagesSaga(action: { payload: any }): Generator {
  try {
    const formData = new FormData();
    const messageId = action.payload.id || "0";
    formData.append("actionName", "MessagesLoad");
    formData.append("messageId", messageId);
    formData.append("oldMessages", action.payload.oldMessages || false);
    const response = (yield call(() =>
      axios.post("https://a0830433.xsph.ru/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    )) as AxiosResponse;

    const messages = response.data;
    yield put(loadMessagesSuccess(messages, action.payload.oldMessages));
  } catch (error: any) {
    yield put(loadMessagesFailure(error.message));
  }
}

export function* messagesSaga() {
  yield takeLatest(MESSAGES_LOAD_REQUEST, loadMessagesSaga as () => Generator);
}
