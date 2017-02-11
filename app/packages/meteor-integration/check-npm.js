import { Meteor } from 'meteor/meteor';
import { checkNpmVersions } from 'meteor/tmeasday:check-npm-versions';

if (Meteor.isClient) {
  checkNpmVersions({
    'apollo-client': '^0.7.0 || ^0.8.0',
  }, 'apollo');
} else {
  checkNpmVersions({
    'graphql-server-express': '^0.6.0',
    "body-parser": "^1.15.2",
    "express": "^4.14.0",
    "graphql": "^0.8.0 || ^0.9.0",
    "subscriptions-transport-ws": "^0.5.1",
    "graphql-tag": "^1.1.2",
    "graphql-subscriptions": "^0.3.0",
    "graphql-tools": "^0.9.0 || 0.10.0",
  }, 'apollo');
}
