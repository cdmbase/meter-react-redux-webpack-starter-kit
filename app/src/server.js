import { ReactRouterSSR } from 'meteor/reactrouter:react-router-ssr';
import 'MainApp/server';
import 'IDEApp/server';
import { createApolloServer } from 'meteor/apollo';
<<<<<<< HEAD
import schema from './graphql/schema';
import { subscriptionManager } from './graphql/subscriptions';
import models from './graphql/models';
=======
import schema from './schema';
import { subscriptionManager } from './subscriptions';
>>>>>>> fe75b6f... with apollo subscription
import logger from 'cdm-logger';

// Do server-rendering only in production
// Otherwise, it will break the hot-reload
// DO NOT REMOVE THIS LINE TO TEST, use: meteor --production
if (process.env.NODE_ENV === 'production') {
    // Load Webpack infos for SSR
  ReactRouterSSR.LoadWebpackStats(WebpackStats);

  require('./routes').default;
}
logger.debug('Subscription is ', subscriptionManager);

createApolloServer({
  schema,
<<<<<<< HEAD
  context: models,
=======
>>>>>>> fe75b6f... with apollo subscription
}, { subscriptionManager });
