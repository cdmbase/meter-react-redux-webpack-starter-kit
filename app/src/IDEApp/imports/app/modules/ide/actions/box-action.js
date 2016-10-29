import {ACTION_SELECT_WORKSPACE} from '../action-types';
import {EDITOR_JOB_ACTION_CREATION, EDITOR_JOB_ACTION_REMOVE, EDITOR_JOB_ACTION_RENAME} from '../action-types';
import {ACTION_EDITOR_TOGGLE_TERM, ACTION_FS_REQUEST_UPDATE} from '../action-types';
import {ACTION_WORKSPACES_METEOR_SYNC} from '../action-types';
import {WORKSPACE_STATUS_ACTIVE, WORKSPACE_STATUS_SHUTDOWN} from '../action-types';
import {start, modify, complete, reject} from '../../application/actions/job-actions';
import  Boxes   from '../../../../collections/boxes';
import SocketMap, {ConnectionsMap} from '../socket-map';
import {create as connect, bindFServer} from '../../../socket';
import Server from '../../../../collections/servers';


/**
 * Sync the client with current data from database and
 * creates socket connection with FServer
 *
 */
export const sync = () => dispatch => {
    Boxes.find().fetch().forEach(workspace => {
        if (!ConnectionsMap.has(workspace._id)) {
            ConnectionsMap.set(workspace._id, {
                status: workspace.status == WORKSPACE_STATUS_ACTIVE,
                server: Server.findOne({ _id: workspace.server }),
                info: workspace.info,
                ws: workspace.status == WORKSPACE_STATUS_ACTIVE ? (
                    bindFServer(
                        workspace.server.url || "http://localhost",
                        workspace.info.ports.socket,
                        workspace._id,
                        dispatch)
                ) : false
            })
        } else {
            let connection = ConnectionsMap.get(workspace._id);
            if (workspace.status != WORKSPACE_STATUS_ACTIVE) {
                connection.ws && connection.ws.connected ? connection.ws.disconnect() : connection.ws;
                ConnectionsMap.delete(workspace._id);
            }
        }
    });
    dispatch({type: ACTION_WORKSPACES_METEOR_SYNC, workspaces: Boxes.find().fetch()})
};

/**
 * Has start and shutdown actions
 * @type {{start: ((p1?:*)=>(p1:*)=>*), shutdown: ((p1?:*)=>(p1:*)=>*)}}
 */
export const box = ({
    start: _id => dispatch => Meteor.call('box.start', _id, (err, {info = {}}) => {
    }),
    shutdown: _id => dispatch => Meteor.call('box.shutdown', _id),
});

/**
 * Selected workspace Id with be updated
 * @param workspace
 */
export const select = workspace => ({
    type: ACTION_SELECT_WORKSPACE,
    workspace
});

/**
 * Terminal toggle status is updated
 * @param workspace
 * @param status
 */
export const toggleTerminal = (workspace, status) => ({
    type: ACTION_EDITOR_TOGGLE_TERM,
    workspace,
    status
});

/**
 * Actions related to create, rename, remove of workspace
 * @type {{create: ((p1?:*, p2:*)=>(p1:*)=>*), rename: ((p1?:*, p2:*)=>(p1:*)=>*), remove: ((p1?:*, p2:*)=>(p1:*)=>*)}}
 */
export const tasks = {
    create: (id, event) => dispatch => dispatch(start(id, {...event, type: EDITOR_JOB_ACTION_CREATION, active: true})),
    rename: (id, event) => dispatch => dispatch(start(id, {...event, type: EDITOR_JOB_ACTION_RENAME, active: true})),
    remove: (id, event) => dispatch => dispatch(start(id, {...event, type: EDITOR_JOB_ACTION_REMOVE, active: true}))
};