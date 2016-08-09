import configureService from '../lib/configure-service';
import Meteor from 'meteor/meteor';

let startup = () => {
    configureService();
};

Meteor.startup = startup;
