import ApolloClient, { createNetworkInterface } from 'apollo-client';
import {  meteorClientConfig } from 'meteor/apollo';
import { RxApolloClient } from 'apollo-client-rxjs';

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



export const createClient = () => {

  return new ApolloClient(meteorClientConfig());
}

