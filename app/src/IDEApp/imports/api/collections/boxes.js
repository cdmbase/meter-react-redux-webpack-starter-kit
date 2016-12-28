import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { MongoObservable } from 'meteor-rxjs';

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
    optional: true,
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
  server: {
    type: String,
  },
  workspace: {
    type: String,
  },
  info: {
    type: Object,
    optional: true,
  },
  status: {
    type: String,
  },
  createdAt: {
    type: Date,
    autoValue() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return { $setOnInsert: new Date() };
      } else {
        this.unset();  // Prevent user from supplying their own value
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

Boxes.attachSchema(Boxes.schema);


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


//const Boxes = new MongoObservable.Collection(boxes);
Boxes.consts = {
  STATUS_SHUTDOWN: 'STATUS_SHUTDOWN',
  STATUS_ACTIVE: 'STATUS_ACTIVE',
  STATUS_PROCESS: 'STATUS_PROCESS',
};

export default Boxes;
