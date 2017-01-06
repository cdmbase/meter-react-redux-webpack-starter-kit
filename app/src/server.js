import { ReactRouterSSR } from 'meteor/reactrouter:react-router-ssr';
import 'MainApp/server';
import { createApolloServer } from 'meteor/apollo';
import { schema, models, subscriptionManager } from './graphql';
import logger from 'cdm-logger';

// Do server-rendering only in production
// Otherwise, it will break the hot-reload
// DO NOT REMOVE THIS LINE TO TEST, use: meteor --production
if (process.env.NODE_ENV === 'production') {
    // Load Webpack infos for SSR
  ReactRouterSSR.LoadWebpackStats(WebpackStats);

  require('./routes').default;
}


Meteor.startup(() => {
  createApolloServer({
    schema,
    context: models,
  }, { subscriptionManager });
});

