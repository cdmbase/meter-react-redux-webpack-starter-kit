import { ReactRouterSSR } from 'meteor/reactrouter:react-router-ssr';
import 'MainApp/server';
import 'IDEApp/server';
import { createApolloServer } from 'meteor/apollo';
import schema from './graphql/schema';
import { subscriptionManager } from './graphql/subscriptions';
import models from './graphql/models';
import logger from 'cdm-logger';

// Do server-rendering only in production
// Otherwise, it will break the hot-reload
// DO NOT REMOVE THIS LINE TO TEST, use: meteor --production
if (process.env.NODE_ENV === 'production') {
    // Load Webpack infos for SSR
  ReactRouterSSR.LoadWebpackStats(WebpackStats);

  require('./routes').default;
}

createApolloServer({
  schema,
  context: models,
}, { subscriptionManager });
