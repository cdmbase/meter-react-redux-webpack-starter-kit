import { concatEventReducers } from 'MainApp/common/utils/concatEventReducers';

import { ACTION_SELECT_WORKSPACE } from '../action-types';
import { ACTION_WORKSPACES_METEOR_SYNC } from '../action-types';

export const list = concatEventReducers({
    [ACTION_WORKSPACES_METEOR_SYNC]: (state, { workspaces }) => ({...state, ...(workspaces.reduce((acc, workspace) => ({...acc, [workspace._id]: workspace}), {}))}),
    default: state => state || {}
    }
);

export const selected = concatEventReducers({
    [ACTION_SELECT_WORKSPACE]: (state, { workspace }) => workspace,
    default: state => state || {}
});

export const settings = concatEventReducers({
    [ACTION_WORKSPACES_METEOR_SYNC]: (state, { workspaces }) => ({...state, ...(workspaces.reduce((acc, { settings = {}, _id }) => ({...acc, [_id]: settings }), {}))}),
    default: state => state || {}
});


