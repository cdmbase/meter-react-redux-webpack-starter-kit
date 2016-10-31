import randomstring from 'randomstring';
import { JOB_STATUS_DONE, JOB_STATUS_IN_PROGRESS, JOB_STATUS_REJECTED } from '../action-types';
import { ACTION_JOB_MODIFY, ACTION_JOB_SET_STATUS, ACTION_JOB_START } from '../action-types';

export const start = (id, data = {}) => {
    console.log(`Job ${id} started`);
    return {
        type: ACTION_JOB_START,
        id: id || randomstring.generate(32),
        data,
        status: JOB_STATUS_IN_PROGRESS
    }
};

export const setStatus = (id, status) => {
    return {
        id,
        status,
        type: ACTION_JOB_SET_STATUS
    }
};

export const complete = id => setStatus(id, JOB_STATUS_DONE);
export const reject = id => setStatus(id, JOB_STATUS_REJECTED);

export const modify = (id, data) => {
    return {
        id,
        data,
        type: ACTION_JOB_MODIFY
    }
};
