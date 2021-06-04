import { createReducer } from "../utils/forStore";
import { fetchSimulator } from "../utils/forOthers";
import { createRequestFlow } from "../utils/forFetchingFlow";

// action types
const SET_FAKE_SETTINGS_PENDING_FLOW = "SET_FAKE_SETTINGS_PENDING_FLOW";
// const UPDATE_FAKE_SETTINGS_PENDING_FLOW = "UPDATE_FAKE_SETTINGS_PENDING_FLOW";

// reducer handlers
const handlers = {
  [SET_FAKE_SETTINGS_PENDING_FLOW]: (state, action) => ({
    ...state,
    ...action.payload
  })
  // [UPDATE_FAKE_SETTINGS_PENDING_FLOW]: (state, action) => ({
  //   ...state,
  //   ...action.payload,
  //   data: { ...state.data, ...action.payload.data }
  // })
};

// reducer
export const fakeSettingsReducer = createReducer(
  createRequestFlow.getInit({ theme: "white" }),
  handlers
);

// reducer key
fakeSettingsReducer.REDUCER_NAME = "fakeSettings";
const { REDUCER_NAME } = fakeSettingsReducer;

// async action creators
export const fetchFakeSettings = createRequestFlow({
  pendingAction: () => {
    return fetchSimulator({ theme: "white" });
  },
  type: SET_FAKE_SETTINGS_PENDING_FLOW,
  // resetStateData: {},
  showError: true
  // updateResponse: s => s
});

export const putFakeSettings = createRequestFlow({
  pendingAction: () => {
    return fetchSimulator({ theme: "dark" });
  },
  type: SET_FAKE_SETTINGS_PENDING_FLOW,
  // resetStateData: {},
  showError: true
  // updateResponse: s => s
});

// store selectors
export const fakeSettingsSelector = (state) => state[REDUCER_NAME];
