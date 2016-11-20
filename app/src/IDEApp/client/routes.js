import React from 'react';
import { Route } from 'react-router';
import { injectReducer } from 'MainApp/common/configureReducer';
import logger from 'cdm-logger';
import 'IDEApp/server';


let checkAuth = (to) => {
    return (nextState, transition) => {
        if (!Meteor.loggingIn() && !Meteor.userId()) {
            logger.debug("User not authenticated: ", Meteor.user());
            transition({
                pathname: to,
                state: {nextPathname: nextState.location.pathname}
            });
        }
    }
};
const authenticated = (user, id) => user;

export const getRoutes = (store) => {

    const getApp = (nextState, cb) => {
        if (Meteor.isServer) {
            let ui = require('MainApp/common/ui/ui-reducer');
            let reducers = require('IDEApp/imports/ui/reducers');
            injectReducer(store(), {
                ui,
                ...reducers
            });
            cb(null, require('IDEApp/client/app'));
        } else {
            // TODO: Need to find out whether we should using System.imports as shown in
            // https://github.com/mxstbr/react-boilerplate/blob/master/app/routes.js
            require.ensure([], function (require) {
                let ui = require('MainApp/common/ui/ui-reducer');
                let reducers = require('IDEApp/imports/ui/reducers');
                injectReducer(store(), {
                    ui,
                    ...reducers
                });
                cb(null, require('IDEApp/client/app'));
            })
        }
    };

    // If need to inject reducer dynamically then follow the below link
    // https://github.com/davezuko/react-redux-starter-kit/blob/5758b2cc5be4fd064e91f1e9e1cea5e794aec72f/src/routes/Counter/index.js

    const getChildRoutes = [
        require('IDEApp/imports/ui/modules/application/routes'),
        require('IDEApp/imports/ui/modules/ide/routes'),
        require('IDEApp/imports/ui/modules/servers/routes')
    ];

    return (
            <Route path="/app" onEnter={checkAuth('/signin')} getComponents={ getApp }
                   childRoutes={getChildRoutes}/>
    )

};