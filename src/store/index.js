import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import reducerRegistry from './reducerRegistry';

// Middlewares
import log from './middleware/log';
import monitor from './middleware/monitor';

const initialState = {};

const combine = reducers => {
  const reducerNames = Object.keys(reducers);
  const newReducers = reducers;

  Object.keys(initialState).forEach(item => {
    if (reducerNames.indexOf(item) === -1) {
      newReducers[item] = (state = null) => state;
    }
  });

  return combineReducers(newReducers);
};

const reducer = combine(reducerRegistry.getReducers());

const middlewareEnchancer = applyMiddleware(log);

const composedEnhancers = compose(
  middlewareEnchancer,
  monitor
);

const store = {
  ...createStore(reducer, composedEnhancers),
};

reducerRegistry.setChangeListener(reducers => {
  store.replaceReducer(combine(reducers));
});

window.dispatch = store.dispatch;
window.reduxState = () => console.log(store.getState());
export default store;
