import { ReactRouterSSR } from 'meteor/reactrouter:react-router-ssr';
import 'MainApp/server';
import 'IDEApp/server';
import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';

import cdmLogger from 'cdm-logger';
import resolvers from './MainApp/imports/api/graphql/resolvers/resolver';
import dashboardResolvers from './IDEApp/imports/api/graphql/resolvers/dashboardResovers';

const loader = require('graphql-schema-collector');
// Do server-rendering only in production
// Otherwise, it will break the hot-reload
// DO NOT REMOVE THIS LINE TO TEST, use: meteor --production
if (process.env.NODE_ENV === 'production') {
    // Load Webpack infos for SSR
  ReactRouterSSR.LoadWebpackStats(WebpackStats);

  require('./routes').default;
}

const logger = { log: (e) => cdmLogger.error(e.stack) };
// Load graphql schema and resolvers. Schemas are automatically loaded
// Resolvers must be manually loaded by adding the import
loader.loadSchema(`${process.env.PWD}/src/**/schema/*.graphql`, (err, schema) => {
  if (err) {
    logger.error(err);
    return;
  }
  logger.debug('Graphql query loaded!', schema);
  createApolloServer({
    schema: makeExecutableSchema({
      typeDefs: [schema],
      resolvers: Object.assign({}, resolvers, dashboardResolvers),
    }),
  });
});
