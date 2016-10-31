import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Box = new Mongo.Collection('boxes');

Box.schema = new SimpleSchema({
    _id: {
        type: String
    },
    name: {
        type: String
    },
    description: {
        type: String
    },
    lang: {
        type: String
    },
    creator: {
        type: String,
        label: 'Creator'
    },
    completed: {
        type: Boolean
    },
    info: {
        type: Object
    },
    status: {
        type: String
    },
    createdAt: {
        type: Date,
        autoValue: function() {
            if (this.isInsert)
                return new Date();
            if (this.isUpsert)
                return {$setOnInsert: new Date()};
        }
    }
});

//Box.attachSchema(Box.schema);

Box.consts = {
    STATUS_SHUTDOWN: "STATUS_SHUTDOWN",
    STATUS_ACTIVE: "STATUS_ACTIVE",
    STATUS_PROCESS: "STATUS_PROCESS"
};

export default Box;