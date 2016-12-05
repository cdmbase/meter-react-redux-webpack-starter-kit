import { ReactRouterSSR } from 'meteor/reactrouter:react-router-ssr';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import ReactHelmet from 'react-helmet';
import Routes from './MainApp/client/routes';
import configureStore from './common/configureStore';
import createInitialState from './MainApp/server/frontend/createInitialState';
import logger from 'cdm-logger';
import localforage from 'localforage';
import { Random } from 'meteor/random';


const routes = new Routes();

// createInitialState loads files, so it must be called once.
let initialState = createInitialState();
let history;
let store;
let configureReporting;

const reportingMiddleware = () => configureReporting({
  appVersion: initialState.config.appVersion,
  sentryUrl: initialState.config.sentryUrl,
  unhandledRejection: fn => window.addEventListener('unhandledrejection', fn),
});

const getStore = () => {
  if (Meteor.isClient) {
    configureReporting = require('./common/configureReporting');
    logger.debug("Executiing isBrowser code")
    return configureStore({
      initialState,
      platformDeps: { uuid: Random, storageEngine: localforage },
      platformMiddleware: [reportingMiddleware()],
    });
  } else if (Meteor.isServer) {
    return configureStore({
      initialState: {
        ...initialState,
        device: {
          ...initialState.device,
        },
        intl: {
          ...initialState.intl,
          currentLocale: 'en',
          initialNow: Date.now(),
        },
      } });
  }
};

// Create an enhanced history that syncs navigation events with the store
const historyHook = newHistory => history = newHistory;


// Pass the state of the store as the object to be dehydrated server side
const dehydrateHook = () => store.getState();


// Take the rehydrated state and use it as initial state client side
const rehydrateHook = (state) => {
  if (state) {
    logger.debug('RehydrateHook state', state);
    initialState = state;
    return state;
  }
};


// Pass additional props to give to the <Router /> component on the client
const clientProps = {
  htmlHook(html) {
    const head = ReactHelmet.rewind();
    return html.replace('<head>', `<head>${head.title}${head.base}${head.meta}${head.link}${head.script}`);
  },
};

// Create a redux store and pass into the redux Provider wrapper
const wrapperHook = (app) => {
  store = getStore();
  routes.injectStore(store);
  return (<Provider store={store}>{app}</Provider>);
};


const clientOptions = { props: clientProps, rootElement: 'mainContainer', rehydrateHook, wrapperHook };
const serverOptions = { historyHook, dehydrateHook,
  htmlHook(html) {
    const head = ReactHelmet.rewind();
    return html.replace('<head>', `<head>${head.title}${head.base}${head.meta}${head.link}${head.script}`);
  } };

ReactRouterSSR.Run(routes.configure(), clientOptions, serverOptions);

