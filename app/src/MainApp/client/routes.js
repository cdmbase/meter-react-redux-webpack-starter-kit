import { Route, IndexRoute } from 'react-router';
import { Meteor } from 'meteor/meteor';
import App from './app/App';
import Main from './app/Main';
import Index from './app/index';
import NotFound from '../imports/ui/components/notfound/NotFoundPage';
import SignIn from '../imports/ui/components/auth/SignIn';
import SignUp from '../imports/ui/components/auth/SignUp';
import SignOut from '../imports/ui/components/auth/SignOut';
import Docs from '../imports/ui/components/docs/Docs';
import logger from 'cdm-logger';
import Profile from 'Main/Profile';

import { getRoutes } from '../../AdminApp/client/routes';

const checkAuth = to => (nextState, transition) => {
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    logger.debug('User not authenticated: ', Meteor.user());
    transition({
      pathname: to,
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

class routes {

  /**
   * Only need to inject this on the CLIENT side for lazy loading
   */
  injectStore(store) {
    logger.debug('Injecting Store and available states are ', store.getState());
    this.store = store;
  }

  lazyLoadStore = () => this.store;

  appRoutes() {
    try {
      return getRoutes(this.lazyLoadStore);
    } catch (e) {
      logger.warn('App routes were not added');
      return null;
    }
  }


  configure() {
    return (
      <Route component={Main}>
        <Route path="/" component={App}>
          <IndexRoute component={Index} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/signout" component={SignOut} />
          <Route path="/profile" component={ Profile } />
          <Route path="/docs" component={Docs} />
        </Route>
        {/* -- Protected Site here --*/}
        <Route onEnter={checkAuth('/signin')}>
          { this.appRoutes() }
        </Route>
        <Route path="*" component={NotFound} />
      </Route>
    );
  }
}

export default routes;

