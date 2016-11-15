import logger from 'cdm-logger';


export const handler = {
    ['connect']: (dispatch, workspace) => logger.info("Connected!", workspace),
    ['fs-action']: (dispatch, workspace, { data, target ,type }) => {
        dispatch({ type, data, target, workspace})
    }
};