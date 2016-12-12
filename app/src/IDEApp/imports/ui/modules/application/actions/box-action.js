import { Meteor } from 'meteor/meteor';
import logger from 'cdm-logger';
import {
  ACTION_SELECT_WORKSPACE,
  WORKSPACE_STATUS_ACTIVE,
  ACTION_WORKSPACES_METEOR_SYNC,
  WORKSPACE_STATUS_SHUTDOWN,
  ACTION_DELETE_WORKSPACE,
} from '../action-types';
import {
  BOX_CREATE,
  BOX_CREATE_PROGRESS,
  BOX_CREATE_DONE,
  BOX_CREATE_FAIL,
  BOX_START,
  BOX_START_PROGRESS,
  BOX_START_DONE,
  BOX_START_FAIL,
  BOX_SHUTDOWN,
  BOX_SHUTDOWN_PROGRESS,
  BOX_SHUTDOWN_DONE,
  BOX_SHUTDOWN_FAIL,
  BOX_REMOVE,
  BOX_REMOVE_PROGRESS,
  BOX_REMOVE_DONE,
  BOX_REMOVE_FAIL,
} from '../action-types';

import { Boxes, Servers } from '../../../../api/collections';
import SocketMap, { ConnectionsMap } from '../../../../api/socket-map';
import { create as connect, bindFServer } from '../../../../api/socket';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/debounce';
import { MeteorObservable } from 'meteor-rxjs';
/**
 * Sync the client with current data from database and
 * creates socket connection with FServer
 *
 */
export const sync = () => ({
  type: ACTION_WORKSPACES_METEOR_SYNC,
});


/**
 * Has start and shutdown actions
 * @type {{start: ((p1?:*)=>(p1:*)=>*), shutdown: ((p1?:*)=>(p1:*)=>*)}}
 */
export const box = ({
  start: _id => ({ dispatch }) => {
    MeteorObservable.call('box.start', _id).subscribe(result => dispatch({
      type: BOX_START_DONE,
      payload: { result },
    }), error => dispatch({
      type: BOX_START_FAIL,
      payload: { error },
    }),
    );
    return { type: BOX_START_PROGRESS };
  },
  shutdown: _id => ({ dispatch }) => {
    MeteorObservable.call('box.shutdown', _id)
      .subscribe(result =>
      dispatch({
        type: BOX_SHUTDOWN_DONE,
        payload: { result },
      })
    , error => dispatch({
      type: BOX_SHUTDOWN_FAIL,
      payload: { error },
    }));
    return { type: BOX_SHUTDOWN_PROGRESS };
  },
  remove: id => ({ dispatch }) => {
    MeteorObservable.call('box.remove', id)
      .subscribe(result => dispatch({
        type: BOX_REMOVE_DONE,
        payload: { result },
      }), error =>
        dispatch({
          type: BOX_REMOVE_FAIL,
          payload: { error },
        }),
      );
    return { type: BOX_REMOVE_PROGRESS };
  },
  create: (data, callback) => ({ dispatch }) => {
    MeteorObservable.call('box.create', data).subscribe((result) => {
      callback();
      return dispatch({
        type: BOX_CREATE_DONE,
        payload: { result },
      });
    }, error => dispatch({
      type: BOX_CREATE_FAIL,
      payload: { error },
    }));
    return { type: BOX_CREATE_PROGRESS };
  },
})
  ;


/**
 * Selected workspace Id with be updated
 * @param workspace
 */
export const select = workspace => ({
  type: ACTION_SELECT_WORKSPACE,
  workspace,
});
