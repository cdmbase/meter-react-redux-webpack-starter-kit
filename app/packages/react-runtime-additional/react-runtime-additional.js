import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';

const requiredPackages = {
  'react-router': '^3.0.0',
  graphql: '^0.9.0',
};


import { checkNpmVersions } from 'meteor/tmeasday:check-npm-versions';
checkNpmVersions(requiredPackages, 'react-runtime');

const ReactRouter = require('react-router');
const graphql = require('graphql');

export { ReactRouter, graphql };
