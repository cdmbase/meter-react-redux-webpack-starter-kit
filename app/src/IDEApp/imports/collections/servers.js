import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Server = new Mongo.Collection('servers');

Server.schema = new SimpleSchema({
    _id: {
        type: String
    },
    name: {
        type: String
    },
    status: {
        type: String
    },
    info: {
        type: Object,
        label: 'Information'
    },
    createdAt: {
        type: Date,
        autoValue: function() {
            if(this.isInsert)
                return new Date();
            if(this.isUpser)
                return { $setOnInsert: new Date()};
        }
    }
});

export default Server;