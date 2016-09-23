import { Route, IndexRoute } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { Accounts, STATES } from 'meteor/std:accounts-ui';
import Main from 'Main/main';
import Index from 'Main/main-index';
import NotFound from 'Main/not-found';
import SignIn from 'Main/sign-in';
import SignUp from 'Main/sign-up';
import SignOut from 'Main/sign-out';
import { Store } from 'redux';

import { getRoutes } from 'IDEApp/client/routes';

export default class routes {

    /**
     * Only need to inject this on the CLIENT side for lazy loading
     */
    injectStore(store) {
        this.store = store;
    }

    lazyLoadStore = () => this.store;



    configure() {
        return (
        <Route>
            <Route path="/" component={ Main }>s
                <IndexRoute component={ Index }/>
                <Route path="/signin" component={ SignIn }/>
                <Route path="/signup" component={ SignUp }/>
                <Route path="/signout" component={ SignOut }/>
            </Route>
            { getRoutes(this.lazyLoadStore) }
            <Route path="*" component={ NotFound }/>
        </Route>
        );
    }


}
