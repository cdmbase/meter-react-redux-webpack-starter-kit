import React from 'react';
import { Route } from 'react-router';
import { injectReducer } from '../../common/configureReducer';
import logger from 'cdm-logger';

export const getRoutes = (store) => {
  const getApp = (nextState, cb) => {
      logger.debug("in getApp");
    if (Meteor.isServer) {
      const ui = require('../../common/ui/reducer');
      injectReducer(store(), {
        ui,
      });
      cb(null, require('./app/App'));
    } else {
            // TODO: Need to find out whether we should using System.imports as shown in
            // https://github.com/mxstbr/react-boilerplate/blob/master/app/routes.js
      require.ensure([], (require) => {
        const ui = require('../../common/ui/reducer');
        injectReducer(store(), {
          ui,
        });
        cb(null, require('./app/App'));
      });
    }
  };

  return (
        <Route
          path="/app" getComponent={getApp}
        />
  );
};
