import { Route, IndexRoute } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { Accounts, STATES } from 'meteor/std:accounts-ui';
import Main from 'Main/main';
import Index from 'Main/main-index';
import NotFound from 'Main/NotFound';
import SignIn from 'Main/SignIn';
import SignUp from 'Main/SignUp';
import SignOut from 'Main/SignOut';
import Docs from 'Main/Docs';
import { Store } from 'redux';
import logger from 'cdm-logger';

//import { getRoutes } from 'IDEApp/client/routes';

export default class routes {

    /**
     * Only need to inject this on the CLIENT side for lazy loading
     */
    injectStore(store) {
        logger.debug("Injecting Store", store);
        this.store = store;
    }

    lazyLoadStore = () => this.store;

    get appRoutes() {
        try {
            return getRoutes(this.lazyLoadStore)
        } catch(e) {
            logger.warn("App routes were not added");
        }
    }


    configure() {
        return (
        <Route>
            <Route path="/" component={ Main }>s
                <IndexRoute component={ Index }/>
                <Route path="/signin" component={ SignIn }/>
                <Route path="/signup" component={ SignUp }/>
                <Route path="/signout" component={ SignOut }/>
                <Route path="/docs" component={ Docs }/>
            </Route>
             { this.appRoutes }
            <Route path="*" component={ NotFound }/>
        </Route>
        );
    }


}
