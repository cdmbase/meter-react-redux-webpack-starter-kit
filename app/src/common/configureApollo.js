import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { meteorClientConfig } from 'meteor/apollo';


// let url;
// const opts = {};
// if (Meteor.isServer) {
//   opts.ssrMode = true;
//   url = `http://${config.host}:${config.port}/graphql`;
// } else {
//   opts.ssrForceFetchDelay = 100;
//   url = '/graphql';
// }

const opts = {};
if (Meteor.isServer) {
  opts.ssrMode = true;
} else {
  opts.ssrForceFetchDelay = 100;
}

// export const configureApolloClient = (headers = {}, url = '/graphql', options = {}) => new ApolloClient({
//   networkInterface: createNetworkInterface({
//     uri: url,
//     opts: {
//       credentials: 'same-origin',
//       headers,
//     },
//     ...options,
//   }),
// });


export const createClient = () => new ApolloClient(meteorClientConfig(opts));
