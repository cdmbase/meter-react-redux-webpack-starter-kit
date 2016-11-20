
module.exports = {
    path: 'box/:id',
    getComponent(nextState, cb) {
        if (Meteor.isServer) {
            cb(null, require('IDEApp/imports/ui/modules/ide/containers/BoxContainer'));
        } else {
            require.ensure([], function(require) {
                cb(null, require('IDEApp/imports/ui/modules/ide/containers/BoxContainer'));
            })
        }
    },
    childRoutes: [
        { path: 'editor', getComponent(nextState, cb) {
            if (Meteor.isServer) {
                cb(null, require('IDEApp/imports/ui/modules/ide/containers/Ide'));
            } else {
                require.ensure([], function(require) {
                    cb(null, require('IDEApp/imports/ui/modules/ide/containers/Ide'));
                }, 'editor')
            }
        } },
        { path: 'settings', getComponent(nextState, cb) {
            if (Meteor.isServer) {
                cb(null, require('IDEApp/imports/ui/modules/ide/components/Settings'));
            } else {
                require.ensure([], function(require) {
                    cb(null, require('IDEApp/imports/ui/modules/ide/components/Settings'));
                }, 'settings')
            }
        } }
    ]
};

