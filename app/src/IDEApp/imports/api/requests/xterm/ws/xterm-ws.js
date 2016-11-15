import logger from 'cdm-logger';


export const handler = {
    ['connect']: (dispatch, workspace) => logger.info("Connected!", workspace),
};