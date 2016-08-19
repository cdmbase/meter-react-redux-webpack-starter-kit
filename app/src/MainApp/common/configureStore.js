import configureReducer from './configureReducer';
import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import { routerMiddleware, routerReducer, syncHistoryWithStore } from 'react-router-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';


export default function configureStore(options){
    const {
        initialState,
        history,
        platformReducers = {}
        } = options;

    const reducer = configureReducer(initialState, platformReducers);

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

    // Enable hot reload where available.
    if (module.hot) {
        const replaceReducer = configureReducer =>
            store.replaceReducer(configureReducer(initialState, platformReducers));

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
}