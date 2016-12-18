import ApolloClient, { createNetworkInterface } from 'apollo-client';

import {  meteorClientConfig } from 'meteor/apollo';


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




export const createClient = () => new ApolloClient(meteorClientConfig());

