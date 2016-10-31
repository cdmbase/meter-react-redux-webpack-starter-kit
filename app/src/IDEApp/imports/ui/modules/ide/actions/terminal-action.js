import {ACTION_EDITOR_TOGGLE_TERM, ACTION_FS_REQUEST_UPDATE} from '../action-types';
/**
 * Terminal toggle status is updated
 * @param workspace
 * @param status
 */
export const toggleTerminal = (workspace, status) => ({
    type: ACTION_EDITOR_TOGGLE_TERM,
    workspace,
    status
});
