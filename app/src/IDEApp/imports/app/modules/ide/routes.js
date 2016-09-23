
module.exports = {
    path: 'box/:id',
    getComponent(nextState, cb) {
        if (Meteor.isServer) {
            cb(null, require('IDEApp/imports/app/modules/ide/containers/box-container'));
        } else {
            require.ensure([], function(require) {
                cb(null, require('IDEApp/imports/app/modules/ide/containers/box-container'));
            })
        }
    },
    childRoutes: [
        { path: 'editor', getComponent(nextState, cb) {
            if (Meteor.isServer) {
                cb(null, require('IDEApp/imports/app/modules/ide/containers/ide'));
            } else {
                require.ensure([], function(require) {
                    cb(null, require('IDEApp/imports/app/modules/ide/containers/ide'));
                })
            }
        } },
        { path: 'settings', getComponent(nextState, cb) {
            if (Meteor.isServer) {
                cb(null, require('IDEApp/imports/app/modules/ide/components/settings'));
            } else {
                require.ensure([], function(require) {
                    cb(null, require('IDEApp/imports/app/modules/ide/components/settings'));
                })
            }
        } }
    ]
};

