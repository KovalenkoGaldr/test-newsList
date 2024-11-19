import { call, put, delay, spawn, select } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import {
  loadMessagesFailure,
  loadMessagesSuccess,
} from "../actions/messagesActions";

function* pollMessagesSaga(): Generator {
  while (true) {
    try {
      const lastMessageId = (yield select(
        (state: any) => state.messages.messages.at(-1)?.id || "0"
      )) as string;

      const formData = new FormData();
      formData.append("actionName", "MessagesLoad");
      formData.append("messageId", lastMessageId);
      formData.append("oldMessages", "false");

      const response = (yield call(() =>
        axios.post("http://a0830433.xsph.ru/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
      )) as AxiosResponse;

      const messages = response.data;

      if (messages !== "no message") {
        yield put(loadMessagesSuccess(messages, false));
      }
    } catch (error: any) {
      yield put(loadMessagesFailure(error.message));
    }

    yield delay(5000);
  }
}

export function* messagesSaga() {
  yield spawn(pollMessagesSaga);
}
