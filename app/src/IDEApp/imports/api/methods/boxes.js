import  Box  from '../collections/boxes';
import Server from '../collections/servers';
import IOClient from '../io-client';
import { ACTION_WORKSPACE_RUN, ACTION_WORKSPACE_STOP } from '../ws-consts'
import { ACTION_WORKSPACE_CREATE, ACTION_WORKSPACE_REMOVE } from '../ws-consts';
import { ACTION_ASSIGN_USER } from '../ws-consts';


Meteor.methods({
    "box.start": _id => new Promise((resolve, reject) => {
        let workspace = Box.findOne({ _id });

        if(workspace) {
            Box.update(_id, {
                $set: { status: Box.consts.STATUS_PROCESS }
            });
            IOClient.emit(ACTION_WORKSPACE_RUN, { server: workspace.server, workspace: _id });
            resolve({ ok: true, workspace: _id });
        } else {
            reject({ ok: false, workspace: _id });
        }
    }),
    "box.shutdown": _id => new Promise((resolve, reject) => {
        let workspace = Box.findOne( { _id });

        if(workspace) {
            Box.update(_id, {
                $set: { status: Box.consts.STATUS_PROCESS }
            });

            IOClient.emit(ACTION_WORKSPACE_STOP, { server: workspace.server, workspace: _id, container: workspace.info.container });
            resolve({ ok: true, worksapce: _id });
        } else {
            reject({ ok: false, workspace: _id });
        }
    }),
    "box.create": ({ name, lang, description }) => {
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
        if(!Server.findOne()){
            throw new Meteor.Error('no server registered');
        }
        let workspaceId = Box.insert({
            name,
            description,
            lang,
            creator: Meteor.userId() || "guest",
            completed: false,
            server: Server.findOne()._id,
            info: {},
            status: Box.consts.STATUS_SHUTDOWN,
            createdAt: new Date()
        });

        IOClient.emit(ACTION_WORKSPACE_CREATE, { workspace: Box.findOne({ workspaceId }), creator: Meteor.user() });
        IOClient.emit(ACTION_ASSIGN_USER, { user: Meteor.user(), workspace: Box.findOne({ workspaceId }) });
    },
    "box.remove": (boxId) => {
        Box.remove(boxId);
    },
    "box.find": (id) => Box.findOne(id)
});