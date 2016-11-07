import { Meteor } from 'meteor/meteor';
import { Boxes, Servers } from '../collections';

Meteor.publish('boxes.list', () => {
    return Boxes.find({
    })
});

Meteor.publish('servers.list', () => {
    return Servers.find();
});

