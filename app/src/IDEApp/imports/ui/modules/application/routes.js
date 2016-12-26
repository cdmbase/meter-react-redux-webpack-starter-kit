//import { registerEpic } from '../../../../../common/configureEpics';
import logger from 'cdm-logger';

module.exports = {
  path: 'dashboard',
  getComponent(nextState, cb) {
    if (Meteor.isServer) {
      cb(null, require('./containers/DashboardContainer'));
    } else {
      require.ensure([], (require) => {
                /*  Add the reducer to the store on key 'counter'  */

                /* Add Epics */
        // const epic = require('./epics').meteorySyncWorkspace;
        // logger("epic code ", epic);
        // registerEpic(epic);
                /*  Return getComponent   */
        cb(null, require('./containers/DashboardContainer'));

                /* Webpack named bundle   */
      }, 'dashboard');
    }
  },
};
