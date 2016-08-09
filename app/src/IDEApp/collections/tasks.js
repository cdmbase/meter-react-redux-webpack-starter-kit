import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Tasks = new Mongo.Collection('tasks');

Tasks.schema = new SimpleSchema({
    _id: {
        type: String
    },
    text: {
        type: String
    },
    completed: {
        type: Boolean,
        label: 'Checked'
    },
    creator: {
        type: String,
        label: 'Creator'
    },
    createdAt: {
        type: Date,
        autoValue: function(){
            if(this.isInsert)
                return new Date();
            if(this.isUpsert)
                return {$setOnInsert: new Date()};

        }
    }
});

Tasks.attachSchema(Tasks.schema);

export default Tasks;

