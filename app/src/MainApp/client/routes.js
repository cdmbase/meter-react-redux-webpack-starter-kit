import { Route, IndexRoute } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { Accounts, STATES } from 'meteor/std:accounts-ui';
import Main from 'Main/Main';
import Index from 'Main/Index';
import NotFound from 'Main/NotFound';
import SignIn from 'Main/SignIn';
import SignUp from 'Main/SignUp';
import Workspace from 'App/workspace';
import SignOut from 'Main/SignOut';

const getWorkspace = (nextState, cb) => {
    if (Meteor.isServer) {
        cb(null, require('IDEApp/client/app'));
    } else {
        require.ensure([], function(require) {
            console.log("migrating to workspace");
            cb(null, require('IDEApp/client/app'));
        })
    }
};

export default (
    <Route>
        <Route path="/" component={ Main }>
            <IndexRoute component={ Index }/>
            <Route path="/signin" component={ SignIn }/>
            <Route path="/signup" component={ SignUp }/>
            <Route path="/signout" component={ SignOut }/>
        </Route>
        <Route path="/workspace" getComponents={ getWorkspace }>
            <IndexRoute component={ Workspace }/>
        </Route>
        <Route path="*" component={ NotFound } />
    </Route>
);