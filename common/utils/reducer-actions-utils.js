

const rejected = action => `${action}_FAIL`;
const catcher = (action) => err => ({ type: rejected(action), data: err });
const handle = (action, mod = (data) => data) => data => ({ type: action, ...mod(data) });

export const act = (action, type, mod = (...args) => data => data) => (...args) => dispatch => action(...args).then(data => dispatch(handle(type, mod(...args))(data))).catch(catcher(type));
