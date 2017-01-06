import { PubSub, SubscriptionManager } from 'graphql-subscriptions';
import schema from './schema';
import models from './models';

const pubsub = new PubSub();

const subscriptionManager = new SubscriptionManager({
  schema,
  pubsub,
  // setupFuctions: {
  //   ideSubscriptions,
  // },
  onSubscribe: (msg, params) => {
    return Object.assign({}, params, {
      context: models,
    });
  },

});

export { subscriptionManager, pubsub };
