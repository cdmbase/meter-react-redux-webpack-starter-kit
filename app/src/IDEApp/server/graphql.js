import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';


import { typeDefs } from '../imports/api/graphql/dashboardSchema';
import resolvers from '../imports/api/graphql/dashboardResovers';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});



createApolloServer({
  schema,
});
