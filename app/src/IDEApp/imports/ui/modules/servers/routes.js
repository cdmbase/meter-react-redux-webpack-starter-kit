
module.exports = {
    path: 'admin/servers',
    getComponent(nextState, cb) {
        if (Meteor.isServer) {
            cb(null, require('IDEApp/imports/ui/modules/servers/components/List'));
        } else {
            require.ensure([], function (require) {
                cb(null, require('IDEApp/imports/ui/modules/servers/components/List'));
            })
        }
    }
};