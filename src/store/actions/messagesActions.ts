export const MESSAGES_LOAD_REQUEST = "MESSAGES_LOAD_REQUEST";
export const MESSAGES_LOAD_SUCCESS = "MESSAGES_LOAD_SUCCESS";
export const MESSAGES_LOAD_FAILURE = "MESSAGES_LOAD_FAILURE";

export const loadMessagesRequest = (id?: string, oldMessages?: boolean) => ({
  type: MESSAGES_LOAD_REQUEST,
  payload: { id, oldMessages },
});

export const loadMessagesSuccess = (messages: any, oldMessages: any) => ({
  type: MESSAGES_LOAD_SUCCESS,
  payload: messages,
  oldMessages,
});

export const loadMessagesFailure = (error: string) => ({
  type: MESSAGES_LOAD_FAILURE,
  payload: error,
});
