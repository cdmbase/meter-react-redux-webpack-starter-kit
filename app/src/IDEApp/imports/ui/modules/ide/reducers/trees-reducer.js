import { concatEventReducers } from '../../../../../../common/utils/concatEventReducers';
import { FSEvents } from '../action-types';


export const list = concatEventReducers({
    [FSEvents.ACTION_FS_INIT]: (state, { data, workspace }) => ({ ...state, [workspace]: data }),

    [FSEvents.ACTION_FS_DIR_ADD]: (state, { data, workspace }) => ({ ...state, [workspace]: data }),
    [FSEvents.ACTION_FS_DIR_UNLINK]: (state, { data, workspace }) => ({ ...state, [workspace]: data }),
    [FSEvents.ACTION_FS_FILE_ADD]: (state, { data, workspace }) => ({ ...state, [workspace]: data }),
    [FSEvents.ACTION_FS_FILE_UNLINK]: (state, { data, workspace }) => ({ ...state, [workspace]: data }),
    default: state => state || {}
});
