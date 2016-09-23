import { ACTION_SELECT_BOX, ACTION_LOAD_BOXES, ACTION_SYNC_BOXES } from '../action-types';
import { JOB_ACTION_CREATION, JOB_ACTION_REMOVE, JOB_ACTION_RENAME } from '../action-types';
import { ACTION_CLOSE_FILE, ACTION_OPEN_FILE, ACTION_ACTIVATE_TAB, JOB_READ_BOX_FS, ACTION_FS_CAT } from '../action-types';
import { ACTION_TOGGLE_TERMINAL, ACTION_FILE_CHANGE } from '../action-types';
import { start, modify, complete, reject } from '../../application/actions/job-actions';
import { push } from 'react-router-redux';
import  Boxes   from '../../../../collections/boxes';

export const sync = () => dispatch => dispatch({
    type: ACTION_SYNC_BOXES,
    boxes: Boxes.find().fetch()
});

export const load = (user) => dispatch => (dispatch({
    type: ACTION_LOAD_BOXES,
    data: { boxes: Boxes.find().fetch() }
}));

export const box = ({
    fsLoad: (boxId) => dispatch => {
        dispatch(start(boxId, {}));
        Meteor.call('fs.tree', boxId, function(err, result = {}) {
            let { files } = result;
            setTimeout(() => {
                if(err) {
                    dispatch(reject(boxId));
                } else {
                    dispatch({
                        files,
                        boxId,
                        type: JOB_READ_BOX_FS
                    });

                    dispatch(modify(boxId, { files, boxId }));
                    dispatch(complete(boxId));
                }
            }, 1000)
        })
    },
    touch: (boxId, pw, fileName) => dispatch => {
        Meteor.call('fs.touch', boxId, pw, fileName);
    },
    mkdir: (boxId, pw, dirName) => dispatch => {
        Meteor.call('fs.mkdir', boxId, pw, dirName, function(err, result = {}) {
            console.log(result);
        })
    },
    unlink: (boxId, pw) => dispatch => {
        Meteor.call('fs.unlink', boxId, pw);
    }
});


export const file = {
    change: (box, id) => (id, path, content) => dispatch => Meteor.call('fs.chagne', id, path, content, () => dispatch({
        type: ACTION_FILE_CHANGE
    })),
    open: (box, id) => ({
        type: ACTION_OPEN_FILE,
        box,
        id
    }),
    close: (box, id) => ({
        type: ACTION_CLOSE_FILE,
        box,
        id
    }),
    activate: (box, id) => ({
        type: ACTION_ACTIVATE_TAB,
        box,
        id
    }),
    cat: (boxId, relativePath) => (dispatch) => {
        Meteor.call('fs.cat', boxId, relativePath, function(err, result = {}){
            dispatch({
                type: ACTION_FS_CAT,
                data: result.data,
                boxId,
                relativePath
            })
        })
    }
};

export const select = id => ({
    type: ACTION_SELECT_BOX,
    id
});

export const toggleTerminal = (workspace, status) => ({
    type: ACTION_TOGGLE_TERMINAL,
    workspace,
    status
});

export const tasks = {
    create: (id, {box, module }) => dispatch => {
        dispatch(start(id, { type: JOB_ACTION_CREATION, module, active: true  }))
    },
    rename: (id, {box, module}) => dispatch => {
        dispatch(start(id, { type: JOB_ACTION_RENAME, module, active: true }))
    },
    remove: (id, {box, module}) => dispatch => {
        dispatch(start(id, {type: JOB_ACTION_REMOVE, module, active: true}))
    }

};

export const explorer = {};