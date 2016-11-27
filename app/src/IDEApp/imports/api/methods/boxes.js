import  {Boxes, Servers}   from '../collections';
import IOClient from '../io-client';
import { ACTION_WORKSPACE_RUN, ACTION_WORKSPACE_STOP } from '../ws-consts'
import { ACTION_WORKSPACE_CREATE, ACTION_WORKSPACE_REMOVE } from '../ws-consts';
import { ACTION_ASSIGN_USER } from '../ws-consts';
import logger from 'cdm-logger'

Meteor.methods({
    'box.start': _id => new Promise((resolve, reject) => {
        let workspace = Boxes.findOne({ _id });

        if(workspace) {
            Boxes.update(_id, {
                $set: { status: Boxes.consts.STATUS_PROCESS }
            });
            IOClient.emit(ACTION_WORKSPACE_RUN, { server: workspace.server, workspace: _id });
            resolve({ ok: true, workspace: _id });
        } else {
            reject({ ok: false, workspace: _id });
        }
    }),
    'box.shutdown': _id => new Promise((resolve, reject) => {
        let workspace = Boxes.findOne( { _id });

        if(workspace) {
            Boxes.update(_id, {
                $set: { status: Boxes.consts.STATUS_PROCESS }
            });

            IOClient.emit(ACTION_WORKSPACE_STOP, { server: workspace.server, workspace: _id, container: workspace.info.container });
            resolve({ ok: true, workspace: _id });
        } else {
            reject({ ok: false, workspace: _id });
        }
    }),
    'box.create': ({ name, lang, description }) => {
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
        if(!Servers.findOne()){
            throw new Meteor.Error('no server registered');
        }
        let workspaceId = Boxes.insert({
            name,
            description,
            lang,
            creator: Meteor.userId() || 'guest',
            completed: false,
            server: Servers.findOne()._id,
            info: {},
            status: Boxes.consts.STATUS_SHUTDOWN,
            createdAt: new Date()
        });
        IOClient.emit(ACTION_WORKSPACE_CREATE, { workspace: Boxes.findOne(workspaceId), creator: Meteor.user() });
        IOClient.emit(ACTION_ASSIGN_USER, { user: Meteor.user(), workspace: Boxes.findOne(workspaceId) });
    },
    'box.remove': (boxId) => {
        Boxes.remove(boxId);
    },
    'box.find': (id) => Boxes.findOne(id),
    'boxes.list': () => {
        logger.debug('[Methods/boxes] Boxes List');
        return Boxes.find({creator: Meteor.userId()}).fetch();
    }
    
});