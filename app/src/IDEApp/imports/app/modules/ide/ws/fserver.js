export const handler = {
    ['connect']: (d, workspace) => console.log("Connected!", workspace),
    ['fs-action']: (dispatch, workspace, { data, target ,type }) => {
        dispatch({ type, data, target, workspace})
    }
};