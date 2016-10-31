import _ from 'lodash';
import { concatEventReducers } from 'MainApp/common/utils/concatEventReducers';
import { ACTION_EDITOR_ACTIVATE_TAB, ACTION_EDITOR_TOGGLE_TERM, ACTION_EDITOR_OPEN_FILE, ACTION_EDITOR_CLOSE_FILE} from '../action-types';


export const editor = concatEventReducers({
    [ACTION_EDITOR_CLOSE_FILE] : (state = {}, { workspace, id }) => {
        let editor = state[workspace] || {};
        let { active = false } = editor;
        let { opened = [] } = editor;

        if(active == id) {
            let index = opened.indexOf(id);
            active = opened[index -1] ? opened[index - 1] : false
        }

        _.remove(opened, id => _id);

        return { ...state, [workspace] : { ...editor, opened: [...opened], active}}
    },
    [ACTION_EDITOR_OPEN_FILE] : (state = {}, { workspace, id }) => {
        let editor = state[workspace] || {};
        let { opened = [] } = editor;

        !opened.includes(id) && opened.push(id);

        return {...state, [workspace]: {...editor, opened: [...opened]}};
    },
    [ACTION_EDITOR_TOGGLE_TERM] : (state  = {}, { workspace, status }) => ({...state, [workspace]: {...state[workspace], terminal: status}}),
    [ACTION_EDITOR_ACTIVATE_TAB] : (state = {}, { workspace, id }) => {
        let editor = state[workspace] || {};
        return {...state, [workspace]: { ...editor, active: id}}
    },
    default: (state, event) => state || {}
});