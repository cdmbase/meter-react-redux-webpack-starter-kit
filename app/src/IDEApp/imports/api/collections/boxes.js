import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Boxes = new Mongo.Collection('boxes');

Boxes.schema = new SimpleSchema({
  _id: {
    type: String,
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  lang: {
    type: String,
  },
  creator: {
    type: String,
    label: 'Creator',
  },
  completed: {
    type: Boolean,
  },
  info: {
    type: Object,
  },
  status: {
    type: String,
  },
  createdAt: {
    type: Date,
    autoValue: () => {
      if (this.isInsert) {
        return new Date();
      }
      if (this.isUpsert) {
        return { $setOnInsert: new Date() };
      }
    },
  },
});

// Boxes.attachSchema(Box.schema);

Boxes.consts = {
  STATUS_SHUTDOWN: 'STATUS_SHUTDOWN',
  STATUS_ACTIVE: 'STATUS_ACTIVE',
  STATUS_PROCESS: 'STATUS_PROCESS',
};

Boxes.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Boxes.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

export default Boxes;
