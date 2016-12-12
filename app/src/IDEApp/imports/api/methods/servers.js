import { Meteor } from 'meteor/meteor';
import { Servers } from '../collections';
import { STATUS_CONNECTED, STATUS_DISCONNECTED } from '../collections/servers';
import logger from 'cdm-logger';

Meteor.methods({
  'server.create': ({ name, url }) => {
    const workspaceId = Servers.insert({
      name: name || 'Untitled Server',
      url,
      info: {},
      status: STATUS_DISCONNECTED,
    }).subscribe(x => console.log(`Observer 1: onNext: ${x}`),
      e => console.log(`Observer 1: onError: ${e.message}`),
      () => console.log('Observer 1: onCompleted'));
  },
  'server.update': ({ _id, name, url }) => {
    Servers.update(_id, {
      $set: { name, url },
    });
  },
  'server.find': id => Servers.findOne({ _id: id }),
  'server.remove': id => Servers.remove(id),
});

