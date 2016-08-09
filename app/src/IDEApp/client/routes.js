import { Route, IndexRoute } from 'react-router';
import { Accounts, STATES } from 'meteor/std:accounts-ui';
import App from './App/App';
import Hello from './App/Hello';
import Index from './App/Index';
import NotFound from './App/NotFound';
import MainLayout from './App/layouts/MainLayout';


export default (
    <Route>
        <Route path="/" component={App}>
            <IndexRoute component={ Index }/>
            <Route path="/signin" component={ Accounts.ui.LoginForm } fromState={ STATES.SIGN_IN }/>
            <Route path="/signup" component={ Accounts.ui.LoginForm } fromState={ STATES.SIGN_UP }/>
            <Route path="/hello/:name" component={ Hello }/>
        </Route>
        <Route path="/admin" component={ App }>
            <IndexRoute component={ Index }/>
        </Route>
        <Route path="*" component={ NotFound } />
    </Route>
);