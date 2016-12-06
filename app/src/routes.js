import { ReactRouterSSR } from 'meteor/reactrouter:react-router-ssr';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import ReactHelmet from 'react-helmet';
import Routes from './MainApp/client/routes';
import configureStore from './common/configureStore';
import createInitialState from './MainApp/imports/config/createInitialState';
import logger from 'cdm-logger';
import localforage from 'localforage';
import { Random } from 'meteor/random';
import config from './MainApp/imports/config/config';
import ReactGA from 'react-ga';


// createInitialState loads files, so it must be called once.
let initialState = createInitialState();
let history;
let configureReporting;

const routes = new Routes();

const reportingMiddleware = () => configureReporting({
  appVersion: initialState.config.appVersion,
  sentryUrl: initialState.config.sentryUrl,
  unhandledRejection: fn => window.addEventListener('unhandledrejection', fn),
});

const getLocale = req => process.env.IS_SERVERLESS
  ? config.defaultLocale
  : req.acceptsLanguages(config.locales) || config.defaultLocale;
// TODO: need to get the locale from browser
const getStore = () => {
  if (Meteor.isClient) {
    configureReporting = require('./common/configureReporting');
    logger.debug('Configuring store at client side.');
    return configureStore({
      initialState,
      platformDeps: { uuid: Random, storageEngine: localforage },
      platformMiddleware: [reportingMiddleware()],
    });
  }
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
};


const store = getStore();


// Create an enhanced history that syncs navigation events with the store
const historyHook = (newHistory) => {
  history = syncHistoryWithStore(newHistory, store);
  // Setup Google Analytics page tracking
  if (config.isProduction && Meteor.isClient && config.googleAnalyticsId !== 'UA-XXXXXXX-X') {
    ReactGA.initialize(config.googleAnalyticsId);
    history.listen((location) => {
      ReactGA.set({ page: location.pathname });
      ReactGA.pageview(location.pathname);
    });
  }
  return history;
};


// Pass the state of the store as the object to be dehydrated server side
const dehydrateHook = () => store.getState();


// Take the rehydrated state and use it as initial state client side
const rehydrateHook = (state) => {
  if (state) {
    logger.debug('Rehydrate state from server state.');
    initialState = state;
    return state;
  }
  return null;
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
  routes.injectStore(store);

  return (<Provider store={store}>{app}</Provider>);
};


const clientOptions = { props: clientProps, rootElement: 'mainContainer', historyHook, rehydrateHook, wrapperHook };
const serverOptions = { historyHook, dehydrateHook,
  htmlHook(html) {
    const head = ReactHelmet.rewind();
    return html.replace('<head>', `<head>${head.title}${head.base}${head.meta}${head.link}${head.script}`);
  } };

ReactRouterSSR.Run(routes.configure(), clientOptions, serverOptions);

