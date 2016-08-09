import { Meteor } from 'meteor/meteor';
import Tasks from 'IDEApp/collections/tasks';



Meteor.methods({
    addTask: function(text){
        if(!Meteor.userId()){
            throw new Meteor.Error('not-authorized');
        }

        Tasks.insert({
            text: text,
            owner: Meteor.userId(),
            username: Meteor.user().username,
            checked: false,
            createdAt: new Date()
        })
    },
    deleteTask: function(id){
        if(!Meteor.userId()){
            throw new Meteor.Error('not-authorized');
        }

        Tasks.remove(id);
    },
    setChecked: function(id, setChecked){
        if(!Meteor.userId()){
            throw new Meteor.Error('not-authorized');
        }
        Tasks.update(id, {$set: {checked: setChecked}});
    }
});