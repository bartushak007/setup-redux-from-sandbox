import React from "react";
import { toast } from "react-toastify";

const toastView = (err, handler) => (
  <>
    {err}{" "}
    <button
      style={{
        backgroundColor: "transparent",
        border: 0,
        outline: 0,
        color: "#4287f5",
        cursor: "pointer",
        fontSize: "inherit",
        textDecoration: "underline",
        padding: 0,
        margin: 0
      }}
      onClick={handler}
      type="button"
    >
      refresh recent request
    </button>
  </>
);

const pendingPayload = () => ({
  pending: true,
  error: false,
  errorMessage: ""
});

const successPayload = (data) => ({
  pending: false,
  error: false,
  errorMessage: "",
  done: true,
  data: data
});

const failedPayload = (data, err) => {
  const payload = {
    pending: false,
    error: true,
    errorMessage: err,
    done: true
  };
  // reset data with init value only if init
  // data was passed to createRequestFlow function
  // as parameter
  if (data !== undefined) {
    payload.data = data;
  }
  return payload;
};
// fix js comments
/**
 * @typedef {object} CreateRequestFlowFirstParam
 * @property {function} pendingAction - async redux-thunk action creator.
 * @property {string} type - redux action type.
 * @property {any} initData - init data.
 */

/**
 * Check if request was alredy performed if not
 * @param {CreateRequestFlowFirstParam}
 * @return {Object} retun state value.
 */

export const createRequestFlow = ({
  pendingAction,
  type,
  initData,
  reduce = (data) => data,
  showError
}) => {
  //save refresh function from closures
  const closureAction = async (dispatch) => {
    dispatch({
      type,
      payload: pendingPayload()
    });

    let newState = null;

    try {
      const response = await pendingAction();
      newState = {
        type,
        payload: successPayload(reduce(response))
      };
    } catch (err) {
      newState = {
        type,
        payload: failedPayload(initData, err)
      };

      // show error with refresh function
      if (showError) {
        toast.error(
          toastView(`${err} (${type})`, () => closureAction(dispatch)),
          { position: "bottom-center" }
        );
      }
    } finally {
      dispatch(newState);
    }
  };

  return closureAction;
};

createRequestFlow.getInit = (init) => ({
  data: init,
  pending: false,
  error: false,
  errorMessage: "",
  done: false
});
