import { ReactRouterSSR } from 'meteor/reactrouter:react-router-ssr';
import 'MainApp/server';
import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';

import logger from 'cdm-logger';
import resolvers from './MainApp/imports/api/graphql/resolvers/resolver';

const loader = require('graphql-schema-collector');
// Do server-rendering only in production
// Otherwise, it will break the hot-reload
// DO NOT REMOVE THIS LINE TO TEST, use: meteor --production
if (process.env.NODE_ENV === 'production') {
    // Load Webpack infos for SSR
  ReactRouterSSR.LoadWebpackStats(WebpackStats);

  require('./routes').default;
}

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
      resolvers,
    }),
  });
});
