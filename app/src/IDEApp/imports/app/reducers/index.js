import { combineReducers } from 'redux';

import { jobs } from '../modules/application/reducers/job-reducer';
import { editor } from '../modules/ide/reducers/editor-reducer';
import { list as fileList, content as filesContent } from '../modules/ide/reducers/filesystems-reducer';
import { list as treeList } from '../modules/ide/reducers/trees-reducer';
import { list as workspacesList, selected as selectedWorkspace, settings as workspaceSettings } from '../modules/ide/reducers/workspaces-reducer';


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
    jobs,
    editor,
    workspaces
};