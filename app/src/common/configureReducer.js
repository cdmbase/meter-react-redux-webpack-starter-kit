/* @flow weak */
import type { Action, State } from './types';
import app from './app/reducer';
import config from './config/reducer';
import device from './device/reducer';
import intl from './intl/reducer';
import themes from './themes/reducer';
import todos from './todos/reducer';
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { fieldsReducer as fields } from './lib/redux-fields';
import logger from 'cdm-logger';

/*
 users and auth are removed from original version
 routerReducer is also used which don't exist in original version
 injectReducer is custom one added for asyncReducers
 Added custom changes
 Added apollo to resetStateOnSignOutReducer
 */

// stackoverflow.com/q/35622588/233902
const resetStateOnSignOutReducer = (reducer, initialState) => (
  state: State,
  action: Action,
) => {
  // const userWasSignedOut =
  //   action.type === 'ON_AUTH' &&
  //   state.users.viewer &&
  //   !action.payload.firebaseUser;

  // TODO: [custom] instead hardcoded to false
  const userWasSignedOut = false;
  if (!userWasSignedOut) {
    return reducer(state, action);
  }
  // Purge sensitive data, preserve only app and safe initial state.
  return reducer({
    app: state.app,
    config: initialState.config,
    device: initialState.device,
    intl: initialState.intl,
<<<<<<< HEAD
<<<<<<< HEAD
    routing: state.routing, // Routing state has to be reused
=======
    routing: state.routing, // Routing sstate has to be reused
>>>>>>> fe75b6f... with apollo subscription
=======
    routing: state.routing, // Routing state has to be reused
>>>>>>> 4dbaabf... fixed SSR
    apollo: state.apollo,
  }, action);
};

const configureReducer = (initialState: Object, asyncReducers: Object) => {
  let reducer = combineReducers({
    app,
    config,
    device,
    fields,
    intl,
    themes,
    todos,
    routing,
    ...asyncReducers,
  });

  // The power of higher-order reducers, http://slides.com/omnidan/hor
  reducer = resetStateOnSignOutReducer(reducer, initialState);

  return reducer;
};

export const injectReducer = (store: Object, reducers: Object) => {
  if (!store) {
    logger.warn('Injecting reducer when store is null');
    return;
  }
  store.asyncReducers = { ...store.asyncReducers, ...reducers };
  store.replaceReducer(configureReducer(store.getState(), store.asyncReducers));
};

export default configureReducer;
