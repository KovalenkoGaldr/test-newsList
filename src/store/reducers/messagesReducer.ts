import {
  MESSAGES_LOAD_FAILURE,
  MESSAGES_LOAD_REQUEST,
  MESSAGES_LOAD_SUCCESS,
} from "../actions/messagesActions";

interface IInitState {
  messages: any[];
  loading: boolean;
  error: any | null;
}

const initialState: IInitState = {
  messages: [],
  loading: false,
  error: null,
};

export default function messagesReducer(state = initialState, action: any) {
  switch (action.type) {
    case MESSAGES_LOAD_REQUEST:
      return { ...state, loading: true, error: null };
    case MESSAGES_LOAD_SUCCESS:
      if (action.oldMessages) {
        return {
          ...state,
          loading: false,
          messages:
            action.payload !== "no message"
              ? [
                  ...state.messages,
                  ...action.payload.Messages.filter(
                    (msg: any) =>
                      !state.messages.some(
                        (existingMsg) => existingMsg.id === msg.id
                      )
                  ),
                ]
              : state.messages,
        };
      }
      return {
        ...state,
        loading: false,
        messages:
          action.payload !== "no message"
            ? [
                ...state.messages,
                ...action.payload.Messages.filter(
                  (msg: any) =>
                    !state.messages.some(
                      (existingMsg) => existingMsg.id === msg.id
                    )
                ),
              ]
            : state.messages,
      };
    case MESSAGES_LOAD_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
