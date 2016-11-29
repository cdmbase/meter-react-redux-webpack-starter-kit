import { concatEventReducers } from 'MainApp/common/utils/concatEventReducers';
import { FSEvents } from '../action-types';
import logger from 'cdm-logger'


const treeToList = (node = {}, list = {}, fn = ({ children, leaf }) => (children || [])) => {
    logger.debug("treeToList :", node);
    let children = fn(node);
    let leafs = children.filter(({ leaf }) => leaf);
    let modules = children.filter(({ leaf }) => !leaf);

    list = leafs.reduce((acc, el) => ({ ...acc, [el.relativePath]: el }), list);
    list = modules.reduce((acc, el) => ({...acc, ...treeToList(el)}), list);

    return list;
};

export const list = concatEventReducers({
    [FSEvents.ACTION_FS_INIT]: (state, { workspace, data }) => ({...state, [workspace]: treeToList(data, {})}),

    [FSEvents.ACTION_FS_DIR_ADD]: (state, { data, workspace }) => ({ ...state, [workspace]: treeToList(data, {}) }),
    [FSEvents.ACTION_FS_DIR_UNLINK]: (state, { data, workspace }) => ({ ...state, [workspace]: treeToList(data, {}) }),
    [FSEvents.ACTION_FS_FILE_ADD]: (state, { data, workspace }) => ({ ...state, [workspace]: treeToList(data, {}) }),
    [FSEvents.ACTION_FS_FILE_UNLINK]: (state, { data, workspace }) => ({ ...state, [workspace]: treeToList(data, {}) }),
    default: state => state || {}
});

export const content = concatEventReducers({
    ['FS_CAT']: (state, { data, workspace, path }) => {
        logger.debug("ACTION_FS_CAT", data)
        return ({...state, [workspace]: {...(state[workspace] || {}), [path]: data}})
    },
    default: state => state || {}
});