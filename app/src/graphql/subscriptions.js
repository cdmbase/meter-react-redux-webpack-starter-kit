import { PubSub, SubscriptionManager } from 'graphql-subscriptions';
import schema from './schema';
import logger from 'cdm-logger';

const pubsub = new PubSub();
const subscriptionManager = new SubscriptionManager({
  schema,
  pubsub,
  setupFuctions: {
  },
});

export { subscriptionManager, pubsub };
