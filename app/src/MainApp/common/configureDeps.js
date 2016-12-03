/* @flow weak */
// Damn, by feature importing doesn't work in Node.js.
// import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/database';
// So we have to import everything.
import validate from './validate';
import { Random } from 'meteor/random';

/*
  Removed firebase dependencies
 */


const configureDeps = (initialState, platformDeps) => ({
  ...platformDeps,
  getUid: () => Random.id,
  now: () => Date.now(),
  validate,
});

export default configureDeps;
