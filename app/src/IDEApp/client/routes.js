import React from 'react';
import { Route } from 'react-router';
import { injectReducer } from '../../common/configureReducer';
import { registerEpic } from '../../common/configureEpics';
import logger from 'cdm-logger';

export const getRoutes = (store) => {
  const getApp = (nextState, cb) => {
    if (Meteor.isServer) {
      const ui = require('../../common/ui/reducer');
      const reducers = require('../imports/ui/reducers');
      injectReducer(store(), {
        ui,
        ...reducers,
      });
      cb(null, require('IDEApp/client/app'));
    } else {
            // TODO: Need to find out whether we should using System.imports as shown in
            // https://github.com/mxstbr/react-boilerplate/blob/master/app/routes.js
      require.ensure([], (require) => {
        const ui = require('../../common/ui/reducer');
        const reducers = require('../imports/ui/reducers');
        injectReducer(store(), {
          ui,
          ...reducers,
        });

        /* Add Epics */
        const appEpic = require('../imports/ui/epics');
        registerEpic(appEpic);

        cb(null, require('IDEApp/client/app'));
      });
    }
  };

    // If need to inject reducer dynamically then follow the below link
    // https://github.com/davezuko/react-redux-starter-kit/blob/5758b2cc5be4fd064e91f1e9e1cea5e794aec72f/src/routes/Counter/index.js

  const getChildRoutes = [
    require('../imports/ui/modules/application/routes'),
    require('../imports/ui/modules/ide/routes'),
    require('../imports/ui/modules/servers/routes'),
  ];

  return (
        <Route
          path="/app" getComponents={getApp}
          childRoutes={getChildRoutes}
        />
  );
};
