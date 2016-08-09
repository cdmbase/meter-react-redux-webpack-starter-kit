import app from './app/reducer';
import config from './config/config-reducer';
import device from './device/device-reducer';
import intl from './intl/intl-reducer';
import { updateStateOnStorageLoad } from './configureStorage';
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import ui from './ui/ui-reducer';



export default function configureReducer(initialState, platformReducers){
    let reducer = combineReducers({
        ...platformReducers,
        app,
        config,
        device,
        intl,
        routing,
        ui
    });

    reducer = updateStateOnStorageLoad(reducer);

    return reducer;
}
