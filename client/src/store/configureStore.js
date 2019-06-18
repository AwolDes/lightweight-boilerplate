import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './root-reducer';

const loggerMiddleware = createLogger();

let middleware = [thunkMiddleware]; // middleware on both prod & dev is currently none

if (process.env.NODE_ENV !== 'production') {
  middleware = [...middleware, loggerMiddleware]; // append dev middleware when not on prod
} else {
  middleware = [...middleware]; // append prod middleware
}

export default function configureStore(preloadedState) {
  const store = createStore(rootReducer, preloadedState, compose(
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f, // eslint-disable-line
  ));

  return store;
}
