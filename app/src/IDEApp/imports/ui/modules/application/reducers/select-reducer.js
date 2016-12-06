import { concatEventReducers } from '../../../../../../common/utils/concatEventReducers';
import { ACTION_SELECT_WORKSPACE } from '../action-types';


export const selected = concatEventReducers({
    [ACTION_SELECT_WORKSPACE]: (state, { workspace }) => workspace,
    default: state => state || {}
});
