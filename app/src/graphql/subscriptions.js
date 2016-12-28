import { PubSub, SubscriptionManager } from 'graphql-subscriptions';
import schema from './schema';
import logger from 'cdm-logger';
import * as subscriptions from '../IDEApp/imports/api/graphql/subscriptions';

const pubsub = new PubSub();
const subscriptionManager = new SubscriptionManager({
  schema,
  pubsub,
  setupFuctions: {
    ...subscriptions,
  },
});

export { subscriptionManager, pubsub };
