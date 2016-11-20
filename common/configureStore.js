/* @flow */
import configureReducer from './configureReducer';
import { applyMiddleware, createStore, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

type Options = {
    initialState: Object,
    platformDeps?: Object,
    platformMiddleware?: Array<Function>,
};
const configureStore = (options: Options) => {
    const {
        initialState,
        history,
        platformDeps = {},
        platformMiddleware = [],
        } = options;

    const reducer = configureReducer(initialState);

    // ======================================================
    // Middleware Configuration
    // ======================================================
    const middleware = [thunk, routerMiddleware(history)];

    // ======================================================
    // Store Enhancers
    // ======================================================
    const enhancers = [];
    if (process.env.NODE_ENV !== 'production' && window.devToolsExtension) {
        const devToolsExtension = window.devToolsExtension;
        if (typeof devToolsExtension === 'function') {
            enhancers.push(devToolsExtension())
        }
    }


    const store = createStore(
        reducer,
        initialState,
        compose(
            applyMiddleware(...middleware),
            ...enhancers
        )
    );

    // to inject reducers in future
    store.asyncReducers = {};



    // Enable hot reload where available.
    if (module.hot) {
        const replaceReducer = configureReducer =>
            store.replaceReducer(configureReducer(initialState));

        if (initialState.device.isReactNative) {
            module.hot.accept(() => {
                replaceReducer(require('./configureReducer').default);
            });
        } else {
            module.hot.accept('./configureReducer', () => {
                replaceReducer(require('./configureReducer'));
            });
        }
    }

    return store;
};

export default configureStore;