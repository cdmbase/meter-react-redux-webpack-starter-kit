import { merge } from 'lodash';
import defaultResolvers from '../MainApp/imports/api/server/graphql/resolvers';
import logger from 'cdm-logger';

const resolvers = merge(defaultResolvers);

export default resolvers;
