import React from 'react';
import { Meteor } from 'meteor/meteor';
import { composeWithTracker, compose } from 'react-komposer';
import logger from 'cdm-logger';

import { Servers } from '../../../../api/collections';
import ServerList from '../components/ServerList';

const composer = (props, onData) => {
    if(Meteor.subscribe('servers.list').ready()){
        const servers = Servers.find().fetch();
        logger.debug("Servers data: ", servers);
        onData(null, { servers })
    } else {
        logger.warn("Server subscription is not ready");
    }
};

export default composeWithTracker(composer)(ServerList);