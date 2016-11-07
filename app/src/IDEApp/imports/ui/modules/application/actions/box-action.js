import {Meteor} from 'meteor/meteor';
import {ACTION_SELECT_WORKSPACE, ACTION_DELETE_WORKSPACE} from '../action-types';
import {ACTION_WORKSPACES_METEOR_SYNC} from '../action-types';
import {WORKSPACE_STATUS_ACTIVE, WORKSPACE_STATUS_SHUTDOWN} from '../action-types';
import  {Boxes, Servers} from '../../../../api/collections';
import SocketMap, {ConnectionsMap} from '../../../../api/socket-map';
import {create as connect, bindFServer} from '../../../../api/socket';
import logger from 'cdm-logger'

/**
 * Sync the client with current data from database and
 * creates socket connection with FServer
 *
 */
export const sync = () => dispatch => {
    logger.debug("Syncing Workispace");
    Meteor.call('boxes.list', (error, boxes) => {
        boxes.forEach(workspace => {
            if (!ConnectionsMap.has(workspace._id)) {
                Meteor.call('server.find', workspace.server, (error, server) => {
                    ConnectionsMap.set(workspace._id, {
                        status: workspace.status == WORKSPACE_STATUS_ACTIVE,
                        server,
                        info: workspace.info,
                        ws: workspace.status == WORKSPACE_STATUS_ACTIVE ? (
                            bindFServer(
                                workspace.server.url || "http://localhost",
                                workspace.info.ports.socket,
                                workspace._id,
                                dispatch)
                        ) : false
                    })
                })
            } else {
                let connection = ConnectionsMap.get(workspace._id);
                if (workspace.status != WORKSPACE_STATUS_ACTIVE) {
                    connection.ws && connection.ws.connected ? connection.ws.disconnect() : connection.ws;
                    ConnectionsMap.delete(workspace._id);
                }
            }
        });
        dispatch({type: ACTION_WORKSPACES_METEOR_SYNC, workspaces: boxes})
    });

};

/**
 * Has start and shutdown actions
 * @type {{start: ((p1?:*)=>(p1:*)=>*), shutdown: ((p1?:*)=>(p1:*)=>*)}}
 */
export const box = ({
    start: _id => dispatch => Meteor.call('box.start', _id, (error, result) => {
        if(error){
            logger.error("Box Start got failed!");
            return
        }
        sync()(dispatch);
    }),
    shutdown: _id => dispatch => Meteor.call('box.shutdown', _id, (error, result) => {
        if(error) {
            logger.error("Box Shutdown got failed!");
            return;
        }
        sync()(dispatch);
    }),
    remove: id => dispatch => Meteor.call('box.remove', id, (error, result) => {
        if(error){
            logger.error("Box Remove got failed!");
            return;
        }
        dispatch({type: ACTION_DELETE_WORKSPACE, workspaceId: id});
    }),
    create: (data, callback) => dispatch => {
        Meteor.call('box.create', data, (error, result) => {
            if (error) {
                logger.error("Box Start got failed!");
                throw new Meteor.Error(555, error);
            } else {
                callback();
                sync()(dispatch);
            }
        });
    }

});


/**
 * Selected workspace Id with be updated
 * @param workspace
 */
export const select = workspace => ({
    type: ACTION_SELECT_WORKSPACE,
    workspace
});


