/* @flow */
import type { Action, Deps } from '../types';
import { Observable } from 'rxjs/Observable';
import { REHYDRATE } from 'redux-persist/constants';


export const appError = (error: Object): Action => ({
  type: 'APP_ERROR',
  payload: { error },
});

export const appOnline = (online: boolean): Action => ({
  type: 'APP_ONLINE',
  payload: { online },
});

export const appShowMenu = (menuShown: boolean): Action => ({
  type: 'APP_SHOW_MENU',
  payload: { menuShown },
});

// Called on componentDidMount aka only at the client (browser or native).
export const appStart = (): Action => ({
  type: 'APP_START',
});

export const appStarted = (): Action => ({
  type: 'APP_STARTED',
});

export const appStop = (): Action => ({
  type: 'APP_STOP',
});

export const appStorageLoaded = (state: Object): Action => ({
  type: 'APP_STORAGE_LOADED',
  payload: { state },
});


// TODO: Observable type.
const appStartEpic = (action$: any) =>
  action$.ofType(REHYDRATE)
    .map(appStarted);


export const epics = [
  appStartEpic,
];

