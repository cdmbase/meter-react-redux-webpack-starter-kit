import { Server } from '../collections';
import { STATUS_CONNECTED, STATUS_DISCONNECTED } from '../collections/servers';


Meteor.methods({
    'server.create': ({ name, url }) => {
        let workspaceId = Server.insert({
            name: name || "Untitled Server",
            url,
            info: {},
            status: STATUS_DISCONNECTED
        });
    },
    'server.update': ({ _id, name, url }) => {
        Server.update(_id, {
            $set: { name, url }
        });
    }
});

