import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';

const requiredPackages = {
  'react-router':  '^2.5.0'
};


import { checkNpmVersions } from 'meteor/tmeasday:check-npm-versions';
checkNpmVersions(requiredPackages, 'react-runtime');

const ReactRouter = require('react-router');

export {  ReactRouter };
