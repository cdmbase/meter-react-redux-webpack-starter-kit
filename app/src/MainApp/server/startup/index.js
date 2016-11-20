import configureService from '../lib/configureService';
import { Meteor } from 'meteor/meteor';
import logger from 'cdm-logger';

let startup = () => {
    logger.info("configuring login services");
    configureService();
};

startup();

logger.info(" =====> Meteor App restarted " + new Date(Date.now()) + " <=====");

