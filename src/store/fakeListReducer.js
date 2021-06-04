import { createReducer } from "../utils/forStore";
import { fetchSimulator } from "../utils/forOthers";
import { createRequestFlow } from "../utils/forFetchingFlow";
// action types
const SET_FAKE_LIST_PENDING_FLOW = "SET_FAKE_LIST_PENDING_FLOW";

// reducer handlers
const handlers = {
  [SET_FAKE_LIST_PENDING_FLOW]: (state, action) => ({
    ...state,
    ...action.payload
  })
};

// reducer
export const fakeListReducer = createReducer(
  createRequestFlow.getInit([]),
  handlers
);

// reducer key
fakeListReducer.REDUCER_NAME = "fakeList";
const { REDUCER_NAME } = fakeListReducer;

// async action creators
export const fetchFakeList = createRequestFlow({
  pendingAction: () => {
    return fetchSimulator();
  },
  type: SET_FAKE_LIST_PENDING_FLOW,
  initData: [],
  showError: true
  // reduce: s => s
});

// store selectors
export const fakeListSelector = (state) => state[REDUCER_NAME];
