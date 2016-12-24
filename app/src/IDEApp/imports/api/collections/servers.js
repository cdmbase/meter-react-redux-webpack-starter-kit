import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { MongoObservable } from 'meteor-rxjs';


const Servers = new Mongo.Collection('servers');

Servers.schema = new SimpleSchema({
  _id: {
    type: String,
  },
  name: {
    type: String,
  },
  url: {
    type: String,
  },
  status: {
    type: String,
  },
  info: {
    type: Object,
    label: 'Information',
  },
  createdAt: {
    type: Date,
    autoValue() {
      if (this.isInsert) {
        return new Date();
      }
      if (this.isUpsert) {
        return { $setOnInsert: new Date() };
      }
    },
  },
  updatedAt: {
    type: Date,
    autoValue() {
      if (this.isUpdate) {
        return new Date();
      }
    },
    denyInsert: true,
    optional: true,
  },
});

Servers.attachSchema(Servers.schema);

export const STATUS_DISCONNECTED = 'STATUS_DISCONNECTED';
export const STATUS_CONNECTED = 'STATUS_CONNECTED';

Servers.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Servers.deny({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

//export default new MongoObservable.Collection(Servers);
export default Servers;
