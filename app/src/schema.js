import { makeExecutableSchema, addMockFunctionsToSchema, addErrorLoggingToSchema } from 'graphql-tools';
import logger from 'cdm-logger';
import { merge } from 'lodash';
import resolvers from './MainApp/imports/api/graphql/resolvers/resolver';
import * as appResolvers from './IDEApp/imports/api/graphql/resolvers/';
import loader from 'graphql-schema-collector';


const clientLogger = { log: Meteor.bindEnvironment(e => cdmLogger.error(e.stack)) };
// Load graphql schema and resolvers. Schemas are automatically loaded
// Resolvers must be manually loaded by adding the import
let schemaString;
try {
  schemaString = loader.loadSchema.sync(`${process.env.PWD}/src/**/schema/*.graphql`);
  logger.debug('Graphql query loaded!', schemaString);
} catch (err) {
  logger.error(err);
}
const executableSchema = makeExecutableSchema({
  typeDefs: [schemaString],
  resolvers: merge(resolvers, ...appResolvers),
  logger: clientLogger,
});
addErrorLoggingToSchema(executableSchema, clientLogger);
  logger.debug(executableSchema);
export default executableSchema;
