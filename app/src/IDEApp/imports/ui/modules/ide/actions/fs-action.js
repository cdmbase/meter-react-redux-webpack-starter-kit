import {cat, info, ls, mkdir, rename, touch, unlink, update, terminal} from '../../../../api/requests/fserver/fserver-api';
import {FS_UPDATE, FS_CAT, FS_INFO, FS_LS, FS_MKDIR, FS_RENAME, FS_TOUCH, FS_UNLINK} from '../../../../api/requests/fs-requests';

const rejected = action => `${action}_FAIL`;
const catcher = (action) => err => ({ type: rejected(action), data: err });
const handle = (action, mod = (data) => data) => data => ({ type: action, ...mod(data) });

const act = (action, type, mod = (...args) => data => data) => (...args) => dispatch => action(...args).then(data => dispatch(handle(type, mod(...args))(data))).catch(catcher(type));

export const fs = {
    info: act(info, FS_INFO),
    ls: act(ls, FS_LS),
    cat: act(cat, FS_CAT, (workspace, path) => data => ({...data, workspace, path})),
    mkdir: act(mkdir, FS_MKDIR),
    touch: act(touch, FS_TOUCH),
    unlink: act(unlink, FS_UNLINK),
    rename: act(rename, FS_RENAME),
    update: act(update, FS_UPDATE),
};