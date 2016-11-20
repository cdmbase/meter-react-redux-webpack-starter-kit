
module.exports = {
    path: 'dashboard',
     getComponent(nextState, cb) {
        if (Meteor.isServer) {
            cb(null, require('IDEApp/imports/ui/modules/application/containers/DashboardContainer'));
        } else {
            require.ensure([], (require) => {
                /*  Add the reducer to the store on key 'counter'  */

                /*  Return getComponent   */
                cb(null, require('IDEApp/imports/ui/modules/application/containers/DashboardContainer'));

                /* Webpack named bundle   */
            }, 'dashboard')
        }
    }
};