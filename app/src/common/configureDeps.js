/* @flow weak */
// Damn, by feature importing doesn't work in Node.js.
// import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/database';
// So we have to import everything.
import validate from './validate';

/*
  Removed firebase dependencies
 */


const configureDeps = (initialState, platformDeps) => ({
  ...platformDeps,
  getUid: () => platformDeps.uuid.v4(),
  now: () => Date.now(),
  validate,
});

export default configureDeps;
