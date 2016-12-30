/* @flow */
import configureMiddleware from './configureMiddleware';
import configureReducer from './configureReducer';
import configureStorage from './configureStorage';
import { applyMiddleware, createStore, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { Meteor } from 'meteor/meteor';
import { persistStore, autoRehydrate } from 'redux-persist';

import logger from 'cdm-logger';
/*
  Removed .defualt from require('..').default
  Still using routerMiddleware but it was removed in source
 */
type Options = {
    initialState: Object,
    platformDeps?: Object,
    platformMiddleware?: Array<Function>,
};
const configureStore = (options: Options) => {
  const {
        initialState,
        platformDeps = {},
        platformMiddleware = [],
        } = options;
<<<<<<< HEAD
<<<<<<< HEAD
  const asyncReducers = { apollo: platformDeps.apolloClient.reducer() };
=======
>>>>>>> fe75b6f... with apollo subscription
=======
  const asyncReducers = { apollo: platformDeps.apolloClient.reducer() };
>>>>>>> 4dbaabf... fixed SSR
  const reducer = configureReducer(initialState, asyncReducers);

    // ======================================================
    // Middleware Configuration
    // ======================================================
  // const middleware = [routerMiddleware(history)];
  const middleware = configureMiddleware(
    initialState,
    platformDeps,
    platformMiddleware,
  );
    // ======================================================
    // Store Enhancers
    // ======================================================
  const enhancers = [];
  if ((process.env.NODE_ENV !== 'production' || (Meteor.settings.public.logLevel === 'debug' && Meteor.isClient)) && window.devToolsExtension) {
    const devToolsExtension = window.devToolsExtension;
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension());
    }
  }

  const store = createStore(
        reducer,
        initialState,
        compose(
          applyMiddleware(...middleware),
          autoRehydrate(),
            ...enhancers,
        ),
    );

  if (platformDeps.storageEngine) {
    const config = configureStorage(
      initialState.config.appName,
      platformDeps.storageEngine,
    );
    logger.debug('Configuring Storage Engine for storing redux state in client.');
    persistStore(store, config);
  }

    // to inject reducers in future
  store.asyncReducers = { ...asyncReducers };


  // Enable hot reloading for reducers.
  if (module.hot && typeof module.hot.accept === 'function') {
    if (initialState.device.isReactNative) {
      // React Native for some reason needs accept without the explicit path.
      // facebook.github.io/react-native/blog/2016/03/24/introducing-hot-reloading.html
      module.hot.accept(() => {
        const configureReducer = require('./configureReducer');

        store.replaceReducer(configureReducer(initialState, asyncReducers));
      });
    } else {
      // Webpack for some reason needs accept with the explicit path.
      module.hot.accept('./configureReducer', () => {
        const configureReducer = require('./configureReducer');

        store.replaceReducer(configureReducer(initialState, asyncReducers));
      });
    }
  }

  return store;
};

export default configureStore;
