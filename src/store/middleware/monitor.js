const round = number => Math.round(number * 100) / 100;

const monitor = createStore => (reducer, initialState, enchancer) => {
  const monitoredReducer = (state, action) => {
    const start = performance.now();
    const newState = reducer(state, action);
    const end = performance.now();
    const diff = round(end - start);

    return newState;
  };

  return createStore(monitoredReducer, initialState, enchancer);
};

export default monitor;
