import { concatEventReducers } from 'MainApp/common/utils/concatEventReducers';
import { ACTION_FS_INIT } from '../action-types';
import { ACTION_FS_CAT, FSEvents } from '../action-types';


const treeToList = (node = {}, list = {}, fn = ({ children, leaf }) => (children || [])) => {
    let children = fn(node);
    let leafs = children.filter(({ leaf }) => leaf);
    let modules = children.filter(({ leaf }) => !leaf);

    list = leafs.reduce((acc, el) => ({ ...acc, [el.relativePath]: el }), list);
    list = modules.reduce((acc, el) => ({...acc, ...treeToList(el)}), list);
    console.log("treetolist");
    console.log(list);
    return list;
};

export const list = concatEventReducers({
    [ACTION_FS_INIT]: (state, { workspace, data }) => {
        console.log(data);
        return ({...state, [workspace]: treeToList(data, {})})},

    [FSEvents.ACTION_DIR_ADD]: (state, { data, workspace }) => ({ ...state, [workspace]: treeToList(data, {}) }),
    [FSEvents.ACTION_DIR_UNLINK]: (state, { data, workspace }) => ({ ...state, [workspace]: treeToList(data, {}) }),
    [FSEvents.ACTION_FILE_ADD]: (state, { data, workspace }) => ({ ...state, [workspace]: treeToList(data, {}) }),
    [FSEvents.ACTION_FILE_UNLINK]: (state, { data, workspace }) => ({ ...state, [workspace]: treeToList(data, {}) }),
    default: state => state || {}
});

export const content = concatEventReducers({
    [ACTION_FS_CAT]: (state, { data, workspace, path }) => ({ ...state, [workspace]: { ...(state[workspace] || {}), [path] : data }}),
    default: state => state || {}
});
