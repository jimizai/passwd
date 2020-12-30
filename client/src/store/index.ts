import { createStore, applyMiddleware, compose, Middleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer, { defaultState } from './reducers';

export type State = defaultState;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const middlewares: Middleware[] = [thunkMiddleware];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const enhancer = composeEnhancers(
  applyMiddleware(...middlewares)
  // other store enhancers if any
);

export default function configStore() {
  const store = createStore(rootReducer, enhancer);
  return store;
}
