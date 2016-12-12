import IO from 'socket.io-client';
import { handler as FSHandler } from './requests/fserver/ws/fserver';
import { handler as XtermHandler } from './requests/xterm/ws/xterm-ws';
/**
 * Creates socket on specified port and path
 * @param url
 * @param port
 * @param ns
 * @returns {*}
 */
export const create = (url, port, ns = '') => IO(`${url}:${port}/${ns}`);

/**
 * Triggers IO Actions based on data return by websocket
 * @param ws
 * @param workspace
 * @param handlers
 */
export const bindIOActionCreator = (ws, workspace, handlers) => (dispatch) => {
  Object.keys(handlers).forEach((event) => {
    ws.on(event, data => (handlers[event] || function () {})(dispatch, workspace, data));
  });
  return ws;
};

/**
 * Triggers FS Server action
 * @param url
 * @param port
 * @param workspace
 * @param dispatch
 */
export const bindFServer = (url, port, workspace, dispatch) => bindIOActionCreator(create(url, port, 'fserver'), workspace, FSHandler)(dispatch);


/**
 * Triggers Xterm Server action
 * @param url
 * @param port
 * @param workspace
 * @param dispatch
 */
export const bindXtermServer = (url, port, workspace, dispatch) => bindIOActionCreator(create(url, port, 'xterm'), workspace, XtermHandler)(dispatch);
