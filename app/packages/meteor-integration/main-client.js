import './check-npm.js';

import { createNetworkInterface } from 'apollo-client';
import { Accounts } from 'meteor/accounts-base';
import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import { print } from 'graphql-tag/printer';
import { Client } from 'subscriptions-transport-ws';

const defaultNetworkInterfaceConfig = {
  path: '/graphql',
  options: {},
  useMeteorAccounts: true,
  useSubscription: true,
};

const getDefaultWsClient = () => new Client('ws://localhost:8080');

export const createMeteorNetworkInterface = (givenConfig) => {
  const config = _.extend(defaultNetworkInterfaceConfig, givenConfig);
  const wsClient = givenConfig && givenConfig.wsClient ? givenConfig.wsClient : getDefaultWsClient();
  // absoluteUrl adds a '/', so let's remove it first
  let path = config.path;
  if (path[0] === '/') {
    path = path.slice(1);
  }

  // For SSR
  const uri = Meteor.absoluteUrl(path);
  const networkInterface = createNetworkInterface({ uri });

  if (config.useMeteorAccounts) {
    networkInterface.use([{
      applyMiddleware(request, next) {
        // Accounts._storedLoginToken refers to local storage existing only client-side
        const currentUserToken = config.loginToken ? config.loginToken : Meteor.isClient ? Accounts._storedLoginToken() : null;

        if (!currentUserToken) {
          next();
          return;
        }

        if (!request.options.headers) {
          request.options.headers = new Headers();
        }

        request.options.headers.Authorization = currentUserToken;

        next();
      },
    }]);
  }

  if (config.useSubscription) {
    return _.extend(networkInterface, {
      subscribe: (request, handler) => wsClient.subscribe({
        query: print(request.query),
        variables: request.variables,
      }, handler),
      unsubscribe: (id) => {
        wsClient.unsubscribe(id);
      },
    });
  }
  return networkInterface;
};

export const meteorClientConfig = (networkInterfaceConfig) => {
  return {
    ssrMode: Meteor.isServer,
    networkInterface: createMeteorNetworkInterface(networkInterfaceConfig),
    // Default to using Mongo _id, must use _id for queries.
    dataIdFromObject: (result) => {
      if (result._id && result.__typename) {
        const dataId = result.__typename + result._id;
        return dataId;
      }
      return null;
    },
  };
};
