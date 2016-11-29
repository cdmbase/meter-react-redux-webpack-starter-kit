import { ConnectionsMap } from '../../socket-map';
import Url from 'url';


export const getPort = workspace => ConnectionsMap.has(workspace) ? ConnectionsMap.get(workspace).info.ports.socket : false;
export const getServerUrl = workspace => ConnectionsMap.has(workspace) ? ConnectionsMap.get(workspace).server.url : "http://localhost";
const getBaseFsUrl = (workspace, uri) => `${getServerUrl(workspace)}:${getPort(workspace)}/api/fserver/v1/${uri}`;
const getBaseXtermUrl = (workspace, uri) => `${getServerUrl(workspace)}:${getPort(workspace)}/api/xterm/v1/${uri}`;

const json = res => res.json();
const request = urlSetter => (workspace, uri, options) => fetch(options.query ? setQuery(urlSetter(workspace, uri), options.query) : urlSetter(workspace, uri), options);

const FSRequest = request(getBaseFsUrl);
const XTermRequest = request(getBaseXtermUrl);

const setQuery = (url, params = {} ) => {
    //todo: replace url with stable one
    //url = Url.parse(url);
    url = new URL(url);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    return url.toString();
};

export const info = (workspace) => FSRequest(workspace, 'info/', { method: 'GET'}).then(json);
export const ls = (workspace, path) => FSRequest(workspace, 'ls/', { method: 'GET', query: { path }}).then(json);
export const cat = (workspace, path) => FSRequest(workspace, 'cat/', { method: 'GET', query: { path }}).then(json);
export const mkdir = (workspace, path, name) => FSRequest(workspace, 'mkdir/', { method: "POST", query: { path, name }}).then(json);
export const touch = (workspace, path, name) => FSRequest(workspace, 'touch/', { method: "POST", query: { path, name }}).then(json);
export const unlink = (workspace, path, type) => FSRequest(workspace, 'unlink/', { method: "DELETE", query: { path, type } }).then(json);
export const rename = (workspace, path, name) => FSRequest(workspace, 'rename/', { method: "POST", query: { path, name }}).then(json);
export const update = (workspace, path, content) => {
    let data = new FormData();
    data.append('content', content);
    data.append('path', path);
    return FSRequest(workspace, 'update/', { method: "POST", body: data }).then(json)
};