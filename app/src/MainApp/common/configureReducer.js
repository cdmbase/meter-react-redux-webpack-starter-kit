/* @flow weak */
import app from './app/reducer';
import config from './config/config-reducer';
import device from './device/device-reducer';
import intl from './intl/intl-reducer';
import { updateStateOnStorageLoad } from './configureStorage';
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';



const resetStateOnSignout = (reducer, initialState) => (state, action) => {
    // Reset app state on sign out,  stackoverflow.com/q/35622588/233902
    const userWasSignedOut =
        false;
    if (userWasSignedOut) {
        // Preserve state without sensitive data.
        state = {
            app: state.app,
            config: initialState.config,
            device: initialState.device,
            intl: initialState.intl,
            routing: state.routing, // Routing state has to be reused
        };
    }
    return reducer(state, action);
};


const configureReducer = (initialState, asyncReducers ) => {
    let reducer = combineReducers({
        app,
        config,
        device,
        intl,
        routing,
        ...asyncReducers
    });

    // The power of higher-order reducers, http://slides.com/omnidan/hor
    reducer = resetStateOnSignout(reducer, initialState);
    reducer = updateStateOnStorageLoad(reducer);

    return reducer;
};

export const injectReducer = (store, reducers) => {
    store.asyncReducers = {...store.asyncReducers,...reducers} ;
    store.replaceReducer(configureReducer(store.getState(), store.asyncReducers));
};

export default configureReducer;