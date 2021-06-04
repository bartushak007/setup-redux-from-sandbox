import "./styles.css";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  fakeListSelectorAdvanced,
  fakeSettingsSelectorAdvanced
} from "./store";
import { putFakeSettings } from "./store/fakeSettingsReducer";
import ClipLoader from "react-spinners/ClipLoader";

function App() {
  const fakeList = useSelector(fakeListSelectorAdvanced);
  const fakeSettings = useSelector(fakeSettingsSelectorAdvanced);

  const dispatch = useDispatch();

  const putFakeSettingsAction = () => dispatch(putFakeSettings);
  console.log({ theme: fakeSettings.data.theme });
  return (
    <div className={`${fakeSettings.data.theme} App`}>
      <h1>Hello CodeSandbox </h1>
      <h2>Start editing to see some magic happen!</h2>
      {/* Loader */}
      {[fakeList.pending, fakeSettings.pending].includes(true) && (
        <div className="loader">
          <ClipLoader size="150px" className="loader" />
        </div>
      )}
      {/* Render fake list */}
      {fakeList.data.map((l) => (
        <div key={l}> {l}</div>
      ))}

      <button onClick={putFakeSettingsAction}>Dark</button>
    </div>
  );
}

export default App;
