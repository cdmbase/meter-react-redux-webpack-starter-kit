import {concatEventReducers} from '../../../../../../common/utils/concatEventReducers';
import {ACTION_WORKSPACES_METEOR_SYNC, ACTION_DELETE_WORKSPACE} from '../action-types';

export const list = concatEventReducers({
        [ACTION_WORKSPACES_METEOR_SYNC]: (state, {workspaces}) => ({
            ...(workspaces.reduce((acc, workspace) => ({
                ...acc,
                [workspace._id]: workspace
            }), {}))
        }),
        [ACTION_DELETE_WORKSPACE]: (state, {workspaceId}) => {
            let { [workspaceId]: omit, ...rest} = state;
            return rest
        },
        default: state => state || {}
    }
);


export const settings = concatEventReducers({
    [ACTION_WORKSPACES_METEOR_SYNC]: (state, {workspaces}) => ({
        ...(workspaces.reduce((acc, {settings = {}, _id}) => ({
            ...acc,
            [_id]: settings
        }), {}))
    }),
    [ACTION_DELETE_WORKSPACE]: (state, {workspaceId}) => {
        let { [workspaceId]: omit, ...rest} = state;
        return rest
    },
    default: state => state || {}
});


