import configureService from '../lib/configure-service';
import { Meteor } from 'meteor/meteor';

let startup = () => {
    console.log("configuring services");
    configureService();
};



startup();
