import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import { routerMiddleware, routerReducer, syncHistoryWithStore } from 'react-router-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import makeRootReducer from './reducers';



export default (initialState = {}, history) => {

    console.log(initialState);
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

    // ======================================================
    // Store Instantiation and HMR Setup
    // ======================================================
    const store = createStore(
        makeRootReducer({routing: routerReducer}),
        initialState,
        compose(
            applyMiddleware(...middleware),
            ...enhancers
        )
    );
    store.asyncReducers = {};

    if (module.hot){

        module.hot.accept('./reducers', () => {
            console.log("Hot module is available ");
            const reducers = require('./reducers').default;
            store.replaceReducer(reducers(store.asyncReducers));
        })
    }

    return store;
}