import React from 'react'
import { Meteor } from 'meteor/meteor'
import logger from 'cdm-logger'

import composeWithTracker from 'IDEApp/imports/common/helpers/composeWithTracker';
import { Servers } from '../../../../api/collections';
import ServerList from '../components/ServerList';


const loadServers = (props, onData) => {
    if(Meteor.subscribe('servers.list').ready()){
        const servers = Servers.find().fetch();
        onData(null, { servers })
    } else {
        logger.warn("Server subscription is not ready");
    }
};

export default composeWithTracker(loadServers)(ServerList);