import  Boxes  from '../collections/boxes';
import { boxesPath } from '../common/helpers';

import fs from 'fs';
import path from 'path';
import readdir from 'readdir-plus';
import DockerAPI from 'dockerode';
import portscanner from 'portscanner-plus';

let Docker = new DockerAPI({ socketPath: '/var/run/docker.sock'});
let portNames = ["socket", "application"];

Meteor.methods({

    "box.create": ({ name, lang, description }) => {
        if(!Meteor.userId()){
            throw new Meteor.Error('not-authorized');
        }

        let workspaceId = Boxes.insert({
            name, description, lang,
            creator: Meteor.userId() || "guest",
            completed: false,
            info: {},
            status: Boxes.consts.STATUS_SHUTDOWN
        });

        fs.mkdirSync(path.resolve(boxesPath, workspaceId));
        fs.mkdirSync(path.resolve(boxesPath, workspaceId, 'workspace'));
    },
    "box.remove": (boxId) => {
        Boxes.remove(boxId);
    },
    "box.find": (id) => Boxes.findOne(id)
});