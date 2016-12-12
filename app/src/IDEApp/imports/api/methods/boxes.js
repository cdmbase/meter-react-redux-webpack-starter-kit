import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Boxes, Servers } from '../collections';
import IOClient from '../io-client';
import _ from 'lodash';
import logger from 'cdm-logger';

Meteor.methods({
  'box.start': (_id) => {
    check(_id, String);

    return new Promise((resolve, reject) => {
      const workspace = Boxes.findOne({ _id });
      if (workspace) {
        Boxes.update(_id, {
          $set: {
            status: Boxes.consts.STATUS_PROCESS,
          },
        });
        IOClient.emit('msg', {
          target: `ws.${workspace.server}`,
          payload: { type: 'WS_RUN',
            workspace: workspace.workspace || workspace._id,
            info: workspace.info || {},
          },
        });
        resolve({ ok: true, workspace: _id });
      } else {
        reject({ ok: false, workspace: _id });
      }
    });
  },
  'box.shutdown': (_id) => {
    check(_id, String);

    return new Promise((resolve, reject) => {
      const workspace = Boxes.findOne({ _id });

      if (workspace) {
        Boxes.update(_id, {
          $set: {
            status: Boxes.consts.STATUS_PROCESS,
          },
        });

        IOClient.emit('msg', {
          target: `ws.${workspace.server}`,
          payload: { type: 'WS_STOP',
            workspace: workspace.workspace || workspace._id,
            info: workspace.info || {},
          },
        });

        resolve({
          ok: true,
          workspace: _id,
        });
      } else {
        reject({
          ok: false,
          workspace: _id,
        });
      }
    });
  },
  'box.create': ({ name, lang, description }) => {
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    if (!Servers.findOne()) {
      throw new Meteor.Error('no server registered');
    }
    const id = Boxes
      .collection
      .insert({
        name,
        description,
        lang,
        creator: Meteor.userId() || 'guest',
        completed: false,
        server: Servers.findOne()._id,
        info: {},
        workspace: _.kebabCase(name),
        status: Boxes.consts.STATUS_SHUTDOWN,
      }, { validate: true });

    const workspace = Boxes.findOne(id);

    IOClient.emit('msg', {
      target: `ws.${workspace.server}`,
      payload: { type: 'WS_CREATE',
        workspace: workspace.workspace || workspace._id,
      },
    });
  },
  'box.remove': (_id) => {
    check(_id, String);
    Boxes.remove(_id);
  },
  'box.find': (id) => {
    check(id, String);
    Boxes.findOne(id);
  },
  'boxes.list': () => (
    Boxes.find({
      creator: Meteor.userId(),
    }).fetch()
  ),
});
