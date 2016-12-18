import { Observable } from 'rxjs';
import 'rxjs/add/operator/debounce';
import { MeteorObservable } from 'meteor-rxjs';
import { Boxes, Servers } from '../../../../api/collections';
import SocketMap, { ConnectionsMap } from '../../../../api/socket-map';
import { create as connect, bindFServer } from '../../../../api/socket';
import {
  ACTION_SELECT_WORKSPACE,
  WORKSPACE_STATUS_ACTIVE,
  ACTION_WORKSPACES_METEOR_SYNC,
  ACTION_WORKSPACES_METEOR_SYNCED,
  WORKSPACE_STATUS_SHUTDOWN,
  ACTION_DELETE_WORKSPACE,
} from '../action-types';
import logger from 'cdm-logger';

//
// export const meteorySyncWorkspace = action$ =>
//   action$.ofType(ACTION_WORKSPACES_METEOR_SYNC)
//     .do(() => Boxes.find().fetch().forEach((workspace) => {
//       if (!ConnectionsMap.has(workspace._id)) {
//         Meteor.call('server.find', workspace.server, (error, server) => {
//           ConnectionsMap.set(workspace._id, {
//             status: workspace.status === WORKSPACE_STATUS_ACTIVE,
//             server,
//             info: workspace.info,
//             ws: workspace.status === WORKSPACE_STATUS_ACTIVE ? (
//           bindFServer(
//             server.url || 'http://localhost',
//             workspace.info.ports.socket,
//             workspace._id,
//             dispatch)
//         ) : false,
//           });
//         });
//       } else {
//         const connection = ConnectionsMap.get(workspace._id);
//         if (workspace.status !== WORKSPACE_STATUS_ACTIVE) {
//           connection.ws && connection.ws.connected ? connection.ws.disconnect() : connection.ws;
//           ConnectionsMap.delete(workspace._id);
//         }
//       }
//     }))
// .map(() => ({ type: ACTION_WORKSPACES_METEOR_SYNCED, workspaces: Boxes.find().fetch() }));

// const work = (workspace) => {
//   const w = [];
//   w.push(workspace.forEach((work) => {
//     work.server = Servers.findOne({ _id: work.server });
//     console.log(work);
//     return work;
//   }));
//   console.log("workspqace");
//   console.log(w);
//   return w;
// };

const work = workspace => {
  console.log("Work func")
  console.log(workspace);
}

export const meteorySyncWorkspace = action$ =>
  action$.ofType(ACTION_WORKSPACES_METEOR_SYNC)
    .mergeMap(() =>
    Boxes.find()
      .map(workspace => work(workspace)),

    )
    .map(workspaces => ({ type: ACTION_WORKSPACES_METEOR_SYNCED, workspaces }));

