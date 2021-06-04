import { callToastError } from "./callToastError";

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

export const getInitRequestFlowData = (init) => ({
  data: init,
  pending: false,
  error: false,
  errorMessage: "",
  done: false
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
 * @property {any} resetStateData - init data.
 */

/**
 * Check if request was alredy performed if not
 * @param {CreateRequestFlowFirstParam}
 * @return {Object} retun state value.
 */

export const createRequestFlow = ({
  pendingAction,
  type,
  resetStateData,
  updateResponse = (data) => data,
  showError
}) => {
  //save refresh async request function in closures
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
        payload: successPayload(updateResponse(response))
      };
    } catch (err) {
      newState = {
        type,
        payload: failedPayload(resetStateData, err)
      };

      // show error with refresh function
      if (showError) {
        callToastError({
          errorMessage: err,
          reducerActionType: type,
          callHandler: () => closureAction(dispatch)
        });
      }
    } finally {
      dispatch(newState);
    }
  };

  return closureAction;
};
