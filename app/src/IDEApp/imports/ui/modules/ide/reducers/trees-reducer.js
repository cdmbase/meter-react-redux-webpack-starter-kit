import { concatEventReducers } from 'MainApp/common/utils/concatEventReducers';
import { ACTION_FS_INIT, FSEvents } from '../action-types';


export const list = concatEventReducers({
    [ACTION_FS_INIT]: (state, { data, workspace }) => ({ ...state, [workspace]: data }),

    [FSEvents.ACTION_DIR_ADD]: (state, { data, workspace }) => ({ ...state, [workspace]: data }),
    [FSEvents.ACTION_DIR_UNLINK]: (state, { data, workspace }) => ({ ...state, [workspace]: data }),
    [FSEvents.ACTION_FILE_ADD]: (state, { data, workspace }) => ({ ...state, [workspace]: data }),
    [FSEvents.ACTION_FILE_UNLINK]: (state, { data, workspace }) => ({ ...state, [workspace]: data }),
    default: state => state || {}
});