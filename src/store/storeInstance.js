import { createStore, combineReducers, applyMiddleware } from "redux";
import reduxThunkMiddleware from "redux-thunk";
import { fakeListReducer } from "./fakeListReducer";
import { fakeSettingsReducer } from "./fakeSettingsReducer";

const store = createStore(
  combineReducers({
    [fakeListReducer.REDUCER_NAME]: fakeListReducer,
    [fakeSettingsReducer.REDUCER_NAME]: fakeSettingsReducer
  }),
  {},
  applyMiddleware(reduxThunkMiddleware)
);

export { store };
