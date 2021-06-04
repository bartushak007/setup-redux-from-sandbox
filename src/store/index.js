import { store } from "./storeInstance";
import { fakeListSelector, fetchFakeList } from "./fakeListReducer";
import { fakeSettingsSelector, fetchFakeSettings } from "./fakeSettingsReducer";
import { createGetDataInAdvance } from "../utils/forStore";

// store.subscribe(() => console.log(store.getState()));
// store.dispatch(fetchFakeList);

// to do: create better naming rules for ...SelectorAdvanced
const fakeListSelectorAdvanced = createGetDataInAdvance(
  fakeListSelector,
  fetchFakeList,
  store
);

const fakeSettingsSelectorAdvanced = createGetDataInAdvance(
  fakeSettingsSelector,
  fetchFakeSettings,
  store
);

export { store, fakeListSelectorAdvanced, fakeSettingsSelectorAdvanced };
