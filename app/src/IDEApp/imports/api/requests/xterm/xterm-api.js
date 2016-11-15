import { XTermRequest, json } from '../request-api'


export const info = (workspace) => XTermRequest(workspace, 'info/', { method: 'GET'}).then(json);
export const init = (workspace) => XTermRequest(workspace, 'init/', { method: 'GET'}).then(json);