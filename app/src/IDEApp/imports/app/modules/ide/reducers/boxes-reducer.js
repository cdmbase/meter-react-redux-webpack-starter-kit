import { concatEventReducers } from 'MainApp/common/utils/concatEventReducers';
import _ from 'lodash';
import { ACTION_LOAD_BOXES, ACTION_CLOSE_FILE, ACTION_OPEN_FILE, ACTION_ACTIVATE_TAB, ACTION_SYNC_BOXES, JOB_READ_BOX_FS } from '../action-types';
import { ACTION_TOGGLE_TERMINAL } from '../action-types';
import { ACTION_FILE_ADD, ACTION_CHANGE, ACTION_DIR_ADD, ACTION_DIR_UNLINK, ACTION_FILE_UNLINK } from '../fs-event-types';

const treeToList = (node = {}, list = {}, fn = ({ children, leaf }) => ( children || [])) => {
    let children = fn(node);
    let leafs = children.filter(({leaf}) => leaf);
    let modules = children.filter(({ leaf }) => !leaf);

    list = leafs.reduce((acc, el) => ({
        ...acc, [el.relativePath]: el
    }), list);
    list = modules.reduce((acc, el) => ({
        ...acc,...treeToList(el)
    }), list);

    return list;
};

export const list = concatEventReducers({
    [ACTION_LOAD_BOXES]: (state, { data: { boxes }}) => boxes.reduce((acc, el) => ({
        ...acc,
        [el._id]: el
    }), {}),
    [ACTION_SYNC_BOXES]: (state, { boxes }) => boxes.reduce((acc, el) => ({...acc, [el._id]: el}), {}),
    default: (state, event) => state || {}
});

export const files = concatEventReducers({
    [ACTION_LOAD_BOXES]: (state, { data: { boxes }}) => boxes.reduce((acc, el) => ({
        ...acc, [el._id]: treeToList(el.files, {})
    }), state),
    [JOB_READ_BOX_FS]: (state, { boxId, files }) => ({...state, [boxId]: treeToList(files, {})}),
    [ACTION_FILE_ADD]: (state, { boxId, files }) => ({...state, [boxId]: treeToList(files, {})}),
    [ACTION_DIR_ADD]: (state, { boxId, files }) => ({...state, [boxId]: treeToList(files, {})}),
    [ACTION_DIR_UNLINK]: (state, { boxId, files }) => ({...state, [boxId]: treeToList(files, {})}),
    [ACTION_FILE_UNLINK]: (state, { boxId, files }) => ({...state, [boxId]: treeToList(files, {})}),
    default: (state, event) => state || {}
});

export const settings = concatEventReducers({
    [ACTION_LOAD_BOXES]: (state, { data: { boxes }}) => boxes.reduce((acc, { _id, settings }) => ({...acc, [_id]: settings || {} }), state),
    [ACTION_SYNC_BOXES]: (state, { boxes }) => boxes.reduce((acc, { _id, settings }) => ({...acc, [_id]: settings || {} }), {}),
    default: (state, event) => state || {}

});

export const editor = concatEventReducers({
    [ACTION_LOAD_BOXES]: (state, { data: { boxes }}) => boxes.reduce((acc, { _id, editor }) => ({...acc, [_id]: editor || {} }), {}),
    [ACTION_CLOSE_FILE]: (state = {}, { box, id }) => {
        let editor = state[box] || {};
        let { active = false } = editor;
        let { opened = [] } = editor;

        if(active == id) {
            let index = opened.indexOf(id);
            active = opened[index - 1] ? opened[index - 1] : false;
        }

        _.remove(opened, _id => id == _id);

        return {...state, [box] : {...editor, opened: [...opened], active}};
    },
    [ACTION_OPEN_FILE]: (state, { box, id }) => {
        let editor = state[box] || {};
        let { opened = [] } = editor;
        !opened.includes(id) && opened.push(id);

        return {...state, [box]: {...editor, opened: [...opened]}};
    },
    [ACTION_TOGGLE_TERMINAL]: (state = {}, { workspace, status}) => ( {...state, [workspace]: {...state[workspace] || {}, terminal: status}}),
    [ACTION_ACTIVATE_TAB]: (state = {}, { box, id }) => {
        let editor = state[box] || {};
        return {...state, [box]: {...editor, active: id}};
    },
    default: (state, event) => state || {}
});