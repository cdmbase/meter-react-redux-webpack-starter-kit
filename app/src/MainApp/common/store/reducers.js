import { combineReducers } from 'redux';

import appReducer from '../app/reducer';
export const makeRootReducer = (asyncReducers) => {
    return combineReducers({
        // Add sync reducers here
        appReducer,
        ...asyncReducers
    })
};


export const injectReducer = (store, { key, reducer }) => {
    store.asyncReducers[key] = reducer;
    store.asyncReducers(makeRootReducer(store.asyncReducers))
};

export default makeRootReducer;