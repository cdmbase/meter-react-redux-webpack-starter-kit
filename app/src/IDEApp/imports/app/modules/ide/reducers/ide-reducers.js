import { concatEventReducers } from 'MainApp/common/utils/concatEventReducers';
import { ACTION_SELECT_BOX } from '../action-types';


export const selected = concatEventReducers({
    [ACTION_SELECT_BOX]: (state, { id } ) => id,
    default: (state, event) => state || false
});