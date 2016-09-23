import React, { Component } from 'react';
import { Route, IndexRoute } from 'react-router';
import { injectReducer } from 'MainApp/common/configureReducer';
import { combineReducers } from 'redux';


let checkAuth = (fn, to) => {
    return (nextState, transition) => {
        if (!fn(Meteor.user(), Meteor.userId())) {
            transition({
                pathname: to,
                state: {nextPathname: nextState.location.pathname}
            });
        }
    }
};
const authenticated = (user, id) => user;
const unauthenticated = (user, id) => !user;

export const getRoutes = (store) => {

    const getApp = (nextState, cb) => {
        if (Meteor.isServer) {
            cb(null, require('IDEApp/client/app'));
        } else {
            // TODO: Need to find out whether we should using System.imports as shown in
            // https://github.com/mxstbr/react-boilerplate/blob/master/app/routes.js
            require.ensure([], function (require) {
                let ui = require('MainApp/common/ui/ui-reducer');
                let { jobs } = require('IDEApp/imports/app/modules/application/reducers/job-reducer');
                let { list, files, editor, settings } = require('IDEApp/imports/app/modules/ide/reducers/boxes-reducer');
                let { selected } = require('IDEApp/imports/app/modules/ide/reducers/ide-reducers');
                let { trees, flist } = require('IDEApp/imports/app/modules/ide/reducers/filesystems-reducers');
                injectReducer(store(), {
                    ui,
                    jobs,
                    boxes: combineReducers({list, selected, files, editor, settings, flist}),
                    filesystem: combineReducers({trees})
                });
                cb(null, require('IDEApp/client/app'));
            })
        }
    };

    const getChildRoutes = [
        require('IDEApp/imports/app/modules/application/routes'),
        require('IDEApp/imports/app/modules/ide/routes')
    ];

    return (
        <Route path="/app" onEnter={checkAuth(authenticated, '/signin')} getComponents={ getApp }
               childRoutes={getChildRoutes}/>
    )

};