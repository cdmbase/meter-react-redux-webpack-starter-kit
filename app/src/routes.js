import { ReactRouterSSR } from 'meteor/reactrouter:react-router-ssr';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import { merge } from 'lodash';
import ReactHelmet from 'react-helmet';
import ReactCookie from 'react-cookie';
import Routes from './MainApp/client/routes';
import configureStore from './common/configureStore';
import createInitialState from './MainApp/imports/config/createInitialState';
import logger from 'cdm-logger';
import localforage from 'localforage';
import { Random } from 'meteor/random';
import config from './MainApp/imports/config/config';
import ReactGA from 'react-ga';
import { Meteor } from 'meteor/meteor';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { createClient } from './common/configureApollo';


let initialReduxState;

let history;

let store;

const routes = new Routes();


const getLocale = req => process.env.IS_SERVERLESS
  ? config.defaultLocale
  : req.acceptsLanguages(config.locales) || config.defaultLocale;
// TODO: need to get the locale from browser

const getStore = (initialState, client) => {
  if (Meteor.isClient) {
    const configureReporting = require('./common/configureReporting');

    if (process.env.NODE_ENV === 'production') {
      // configure reportingMiddleware
      const reportingMiddleware = configureReporting({
        appVersion: initialState.config.appVersion,
        sentryUrl: initialState.config.sentryUrl,
        unhandledRejection: fn => window.addEventListener('unhandledrejection', fn),
      });
      return configureStore({
        initialState,
        platformDeps: { uuid: Random, storageEngine: localforage, apolloClient: client },
        platformMiddleware: [reportingMiddleware],
      });
    }

    return configureStore({
      initialState,
      platformDeps: { uuid: Random, storageEngine: localforage, apolloClient: client },
    });
  }

  // this should run on server (SSR)
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
    },
    platformDeps: { apolloClient: client },
  });
};


// Create an enhanced history that syncs navigation events with the store
const historyHook = newHistory => history = newHistory;


// Pass the state of the store as the object to be dehydrated server side
const dehydrateHook = () => store.getState();


// Take the rehydrated state and use it as initial state client side
const rehydrateHook = (state) => {
  logger.debug('Rehydrate state from server state.', state);
  if (state) {
    initialReduxState = state;
    return state;
  }
  return null;
};


const htmlHook = (html) => {
  const head = ReactHelmet.rewind();
  return html.replace('<head>', `<head>${head.title}${head.base}${head.meta}${head.link}${head.script}`);
};

// Pass additional props to give to the <Router /> component on the client
const clientProps = {
  htmlHook,
};


// Create a redux store and pass into the redux Provider wrapper
const wrapperHook = (app) => {
  const client = createClient();
  store = getStore(initialReduxState || createInitialState(), client);
  routes.injectStore(store);
  history = syncHistoryWithStore(history, store);
  if (Meteor.isClient) {
    // Setup Google Analytics page tracking
    if (config.isProduction && config.googleAnalyticsId !== 'UA-XXXXXXX-X') {
      ReactGA.initialize(config.googleAnalyticsId);
      history.listen((location) => {
        ReactGA.set({ page: location.pathname });
        ReactGA.pageview(location.pathname);
      });
    }
  }

  return (<ApolloProvider client={client} store={store}>{app({ history })}</ApolloProvider>);
};

// the preRender: Executed just before the renderToString
const preRender = (req, res) => {
  ReactCookie.plugToRequest(req, res);
};

const dataLoader = async (req, res, app) => await (getDataFromTree(app));

const clientOptions = {
  props: clientProps,
  rootElement: 'mainContainer',
  historyHook,
  rehydrateHook,
  wrapperHook };

const serverOptions = {
  historyHook,
  dehydrateHook,
  preRender,
  dataLoader,
  htmlHook,
};


ReactRouterSSR.Run(routes.configure(), clientOptions, serverOptions);
