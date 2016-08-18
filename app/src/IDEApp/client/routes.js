import { Route, IndexRoute } from 'react-router';
import { Accounts, STATES } from 'meteor/std:accounts-ui';
import Main from './App/Main';
import App from './App/App';
import Hello from './App/Hello';
import Index from './App/Index';
import NotFound from './App/NotFound';
import MainLayout from './App/layouts/MainLayout';
import signin from 'App/signin';
import signup from 'App/signup';
import Workspace from 'App/workspace';
import SignOut from 'App/SignOut';

export default (
    <Route>
        <Route path="/" component={ Main }>
            <IndexRoute component={ Index }/>
            <Route path="/signin" component={ signin }/>
            <Route path="/signup" component={ signup }/>
            <Route path="/signout" component={ SignOut }/>
        </Route>
        <Route path="/workspace" component={ Workspace }>
            <IndexRoute component={ Workspace }/>
        </Route>
        <Route path="*" component={ NotFound } />
    </Route>
);