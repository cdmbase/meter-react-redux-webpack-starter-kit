import { concatEventReducers } from 'MainApp/common/utils/concatEventReducers';
import { extend } from 'MainApp/common/utils/extend';
import { ACTION_JOB_MODIFY, ACTION_JOB_SET_STATUS, ACTION_JOB_START } from '../action-types';

export const jobs = concatEventReducers({
    [ACTION_JOB_MODIFY]: (state = {}, {id, data = {}}) => {
        let job = state[id] || {};
        if(!!job) {
            job.data = extend({}, job.data || {}, data);
            state[id] = job;
        }
        return {...state}
    },
    [ACTION_JOB_SET_STATUS]: (state = {}, {id, status}) => {
        let job = state[id];
        if(!!job) {
            job.status = status;
            state[id] = job;
        }
        return {...state}
    },
    [ACTION_JOB_START]: (state = {}, {id, data, status}) => {
        let job = {
            id,
            data,
            status
        };
        state[id] = job;
        return {...state}
    },
    default: state => state || {}
});