import { makeExecutableSchema, addMockFunctionsToSchema, addResolveFunctionsToSchema } from 'graphql-tools';
import logger from 'cdm-logger';
import loader from 'graphql-schema-collector';
import resolvers from './resolvers';

const clientLogger = { log: Meteor.bindEnvironment(e => logger.error(e.stack)) };
let schemaString;
try {
  // Schemas strings are automatically resolved
  schemaString = loader.loadSchema.sync(`${process.env.PWD}/src/**/schema/*.graphql`);
//  logger.debug('Graphql query loaded!', schemaString);
} catch (err) {
  logger.error('Schema Load failure:', err);
}
const executableSchema = makeExecutableSchema({
  typeDefs: [schemaString],
  resolvers,
  logger: clientLogger,
  allowUndefinedInResolve: true, // optional
  printErrors: true,
  resolverValidationOptions: {
    requireResolversForNonNull: true,
    requireResolversForArgs: true,
    rejectExtraResolvers: true,
  }, // optional
});

export default executableSchema;
