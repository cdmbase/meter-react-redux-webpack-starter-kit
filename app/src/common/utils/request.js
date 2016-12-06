import superagent from 'superagent-defaults';
import CookieMonster from 'cookie-monster';


const API_ENDPOINT = process.env.API_ENDPOINT;

let injectedToken = false;

export let request = superagent();
request.withCredentials();


export let parse = (cb, inj = {}) => (err, res) => cb({success: !err, body: res ? res.body : {}, ...inj});
export let endpoint = (uri, service = false) => url.resolve(service || API_ENDPOINT, uri);
export let getRequest = fn => new Promise((resolve, reject) => fn(request)
    .set({[CookieMonster.getItem('JWT') ? 'Authentication' : '']: CookieMonster.getItem('JWT')})
    .end((err, res = {}) => {
        if (err) {
            reject(err);
        } else {
            resolve({...res.body || {}})
        }
    }));

export let buildUrl = (template, params) => template.split('/')
    .map(part => {
        return part.indexOf(':') != -1 ? (params[part.replace(':', '')] || "") : part
    })
    .filter(e => !!e).join('/');