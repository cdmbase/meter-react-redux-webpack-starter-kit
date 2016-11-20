import { combineReducers } from 'redux';

import { editor } from '../modules/ide/reducers/editor-reducer';
import { list as fileList, content as filesContent } from '../modules/ide/reducers/filesystems-reducer';
import { list as treeList } from '../modules/ide/reducers/trees-reducer';
import { list as workspacesList, settings as workspaceSettings } from '../modules/application/reducers/workspaces-reducer';
import { selected as selectedWorkspace } from '../modules/application/reducers/select-reducer';


const  workspaces= combineReducers({
    selected: selectedWorkspace,
    settings: workspaceSettings,
    list: workspacesList,

    files: combineReducers({
        list: fileList,
        content: filesContent
    }),

    trees: combineReducers({
        list: treeList
    }),
});

export {
    workspaces,
    editor
};