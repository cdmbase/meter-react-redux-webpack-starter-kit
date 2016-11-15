import { ConnectionsMap } from '../socket-map';

export const getPort = workspace => ConnectionsMap.has(workspace) ? ConnectionsMap.get(workspace).info.ports.socket : false;
export const getServerUrl = workspace => ConnectionsMap.has(workspace) ? ConnectionsMap.get(workspace).server.url : "http://localhost";
const getBaseFsUrl = (workspace, uri) => `${getServerUrl(workspace)}:${getPort(workspace)}/api/fserver/v1/${uri}`;
const getBaseXtermUrl = (workspace, uri) => `${getServerUrl(workspace)}:${getPort(workspace)}api/xterm/${uri}`;

const json = res => res.json();
const request = urlSetter => (workspace, uri, options) => fetch(options.query ? setQuery(urlSetter(workspace, uri), options.query) : urlSetter(workspace, uri), options);


const setQuery = (url, params = {} ) => {
    //url = Url.parse(url);
    url = new URL(url);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    return url.toString();
};


export const FSRequest = request(getBaseFsUrl);
export const XTermRequest = request(getBaseXtermUrl);