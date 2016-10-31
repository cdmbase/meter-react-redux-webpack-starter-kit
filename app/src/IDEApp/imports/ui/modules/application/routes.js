
module.exports = {
    path: 'dashboard',
     getComponent(nextState, cb) {
        if (Meteor.isServer) {
            cb(null, require('IDEApp/imports/ui/modules/application/containers/DashboardContainer'));
        } else {
            require.ensure([], function (require) {
                cb(null, require('IDEApp/imports/ui/modules/application/containers/DashboardContainer'));
            })
        }
    }
};