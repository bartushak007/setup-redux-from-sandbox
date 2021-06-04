export const createReducer = (initState, handlers) => (
  state = initState,
  action
) => {
  const handler = handlers[action.type] || ((s) => s);

  return handler(state, action);
};

/**
 * Check if request was alredy performed if not
 * then will do request for you.
 * at the end returns needed state value.
 * todo: come up with better name
 * @param {function} selector Selector.
 * @param {function} action Action creator.
 * @param {Object} store Redux store instance.
 * @return {Object} retun state value.
 */
export const createGetDataInAdvance = (selector, action, store) => () => {
  const data = selector(store.getState());

  if (!data.done && !data.pending && action) {
    store.dispatch(action);
  }
  return data;
};
