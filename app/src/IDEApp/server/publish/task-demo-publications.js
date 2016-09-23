import { Meteor } from 'meteor/meteor';
import Tasks from 'IDEApp/collections/tasks';

Meteor.publish('tasks', function(){
    return Tasks.find({
        owner: this.userId
    })
});