import { ACTION_EDITOR_OPEN_FILE, ACTION_EDITOR_CLOSE_FILE, ACTION_EDITOR_ACTIVATE_TAB } from '../action-types';


export const file = {
    open: (workspace, id) => ( { type: ACTION_EDITOR_OPEN_FILE, workspace, id}),
    close: (workspace, id) => ( { type: ACTION_EDITOR_CLOSE_FILE, workspace, id}),
    activate: (workspace, id) => ( { type: ACTION_EDITOR_ACTIVATE_TAB, workspace, id})
};