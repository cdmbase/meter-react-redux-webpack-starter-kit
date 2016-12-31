/* @flow weak */
import 'rxjs';
import { combineEpics } from 'redux-observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { epics as appEpics } from './app/actions';

/*
  Removed authEpics, userEpics dependencies
 */
const epics = [
  ...appEpics,
];

const epic$ = new BehaviorSubject(combineEpics(...epics));

const configureEpics = (deps: Object) => (action$, { getState }) =>
  epic$.mergeMap(epic => epic(action$, { ...deps, getState }));

export const registerEpic = (epic) => {
  // don't add an epic that is already registered/running
  if (epics.indexOf(epic) === -1) {
    epics.push(epic);
    epic$.next(epic);
  }
};

export default configureEpics;
