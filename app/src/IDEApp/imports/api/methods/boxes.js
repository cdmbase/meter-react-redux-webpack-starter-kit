import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Boxes, Servers } from '../collections';

Meteor.methods({
  'box.start': _id => {
    check(_id, String);

    return new Promise((resolve, reject) => {
      const workspace = Boxes.findOne({ _id });

      if (workspace) {
        Boxes.update(_id, {
          $set: {
            status: Boxes.consts.STATUS_PROCESS,
          },
        });
        resolve({ ok: true, workspace: _id });
      } else {
        reject({ ok: false, workspace: _id });
      }
    })
  },
  'box.shutdown': _id => {
    check(_id, String);

    return new Promise((resolve, reject) => {
      const workspace = Boxes.findOne({ _id });

      if (workspace) {
        Boxes.update(_id, {
          $set: {
            status: Boxes.consts.STATUS_PROCESS,
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

    Boxes.insert({
      name,
      description,
      lang,
      creator: Meteor.userId() || 'guest',
      completed: false,
      server: Servers.findOne()._id,
      info: {},
      status: Boxes.consts.STATUS_SHUTDOWN,
      createdAt: new Date(),
    });
  },
  'box.remove': (_id) => {
    check(_id, String);
    Boxes.remove(_id);
  },
  'box.find': id => {
    check(id, String);
    Boxes.findOne(id);
  },
  'boxes.list': () => {
    return Boxes.find({
      creator: Meteor.userId(),
    }).fetch();
  },
});
