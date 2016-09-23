import { concatEventReducers } from 'MainApp/common/utils/concatEventReducers';
import { ACTION_LOAD_BOXES, JOB_READ_BOX_FS, ACTION_FS_CAT, ACTION_CLOSE_FILE } from '../action-types';
import { ACTION_CHANGE, ACTION_FILE_ADD, ACTION_DIR_ADD, ACTION_DIR_UNLINK, ACTION_FILE_UNLINK } from '../fs-event-types';

const createTreeUpdater = (checker = _ => true, modifier = node => node ) => (node) => {
    if(checker(node)) {
        node = modifier(node);
    }

    node.children = !node.leaf ? (node.children || []).map(createTreeUpdater(checker, modifier)) : false;
    return node;
};


// TODO Important: implement node updates for tree
export const trees = concatEventReducers({
    [ACTION_LOAD_BOXES]: (state, { data: { boxes }}) => boxes.reduce((acc, el) => ({...acc, [el._id]: el.files}), {}),
    [JOB_READ_BOX_FS]: (state, { boxId, files }) => ({...state, [boxId]: files}),
    [ACTION_FILE_ADD]: (state, { workspace, data, target, dir }) => ({...state, [workspace]: data}),
    [ACTION_DIR_ADD]: (state, { workspace, data, target }) => ({...state, [workspace]: data}),
    [ACTION_DIR_UNLINK]: (state, { workspace, data, target }) => ({...state, [workspace]: data}),
    [ACTION_FILE_UNLINK]: (state, { workspace, data, target }) => ({...state, [workspace]: data}),
    default: (state, event) => state || {}
});

export const flist = concatEventReducers({
    [ACTION_FS_CAT]: (state = {}, { data, boxId, relativePath }) => ({...state, [boxId]: {...(state[boxId] || {}), [relativePath]: data}}),
    [ACTION_CLOSE_FILE]: (state = {}, { box, id }) => {
        delete state[box][id];
        return {...state};
    },
    [ACTION_CHANGE]: (state = {}, { data, workspace, target }) => {
        let box = state[workspace];
        if(box && box[target]){
            box[target] = data;
        }

        return {...state}
    },
    default: (state, event) => state || {}
});