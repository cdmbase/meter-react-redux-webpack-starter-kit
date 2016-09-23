
module.exports = {
    path: 'dashboard',
     getComponent(nextState, cb) {
        if (Meteor.isServer) {
            cb(null, require('IDEApp/imports/app/modules/application/components/dashboard'));
        } else {
            require.ensure([], function (require) {
                cb(null, require('IDEApp/imports/app/modules/application/components/dashboard'));
            })
        }
    }
};