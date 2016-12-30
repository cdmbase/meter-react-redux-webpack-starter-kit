import ApolloClient, { createNetworkInterface } from 'apollo-client';
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 4dbaabf... fixed SSR
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
<<<<<<< HEAD
=======
import {  meteorClientConfig } from 'meteor/apollo';
<<<<<<< HEAD
>>>>>>> fe75b6f... with apollo subscription
=======
import { RxApolloClient } from 'apollo-client-rxjs';
>>>>>>> e6aac71... changed to use graphql
=======
>>>>>>> 4dbaabf... fixed SSR

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


<<<<<<< HEAD
<<<<<<< HEAD
export const createClient = () => new ApolloClient(meteorClientConfig(opts));
=======

export const createClient = () => {

  return new ApolloClient(meteorClientConfig());
}

>>>>>>> fe75b6f... with apollo subscription
=======
export const createClient = () => new ApolloClient(meteorClientConfig(opts));
>>>>>>> 4dbaabf... fixed SSR
