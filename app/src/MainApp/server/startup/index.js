import configureService from '../lib/configure-service';
import { Meteor } from 'meteor/meteor';
import cdmLogger from 'cdm-logger';

let startup = () => {
    console.log("configuring services");
    configureService();
};

startup();
