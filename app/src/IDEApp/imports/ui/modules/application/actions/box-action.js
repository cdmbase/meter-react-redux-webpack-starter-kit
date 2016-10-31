import {ACTION_SELECT_WORKSPACE} from '../action-types';
import {ACTION_WORKSPACES_METEOR_SYNC} from '../action-types';
import {WORKSPACE_STATUS_ACTIVE, WORKSPACE_STATUS_SHUTDOWN} from '../action-types';
import  Boxes   from '../../../../api/collections/boxes';
import SocketMap, {ConnectionsMap} from '../../../../api/socket-map';
import {create as connect, bindFServer} from '../../../../api/socket';
import Server from '../../../../api/collections/servers';


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


