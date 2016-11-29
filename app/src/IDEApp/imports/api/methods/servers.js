import { Meteor } from 'meteor/meteor';
import { Servers } from '../collections';
import { STATUS_CONNECTED, STATUS_DISCONNECTED } from '../collections/servers';


Meteor.methods({
    'server.create': ({ name, url }) => {
        let workspaceId = Servers.insert({
            name: name || "Untitled Server",
            url,
            info: {},
            status: STATUS_DISCONNECTED
        });
    },
    'server.update': ({ _id, name, url }) => {
        Servers.update(_id, {
            $set: { name, url }
        });
    },
    'server.find': (id) => Servers.findOne({ _id: id }),
    'server.remove': (id) => Servers.remove(id),
});

