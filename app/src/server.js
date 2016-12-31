import { ReactRouterSSR } from 'meteor/reactrouter:react-router-ssr';
import 'MainApp/server';
import 'IDEApp/server';
import { createApolloServer } from 'meteor/apollo';
<<<<<<< HEAD
<<<<<<< HEAD
import schema from './graphql/schema';
import { subscriptionManager } from './graphql/subscriptions';
import models from './graphql/models';
=======
import schema from './schema';
import { subscriptionManager } from './subscriptions';
>>>>>>> fe75b6f... with apollo subscription
=======
import schema from './graphql/schema';
import { subscriptionManager } from './graphql/subscriptions';
import models from './graphql/models';
>>>>>>> e6aac71... changed to use graphql
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
<<<<<<< HEAD
<<<<<<< HEAD
  context: models,
=======
>>>>>>> fe75b6f... with apollo subscription
=======
  context: models,
>>>>>>> e6aac71... changed to use graphql
}, { subscriptionManager });
