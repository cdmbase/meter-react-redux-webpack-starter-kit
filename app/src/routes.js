import { Route } from 'react-router';
import { ReactRouterSSR } from 'meteor/reactrouter:react-router-ssr';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import ReactHelmet from 'react-helmet';
import AppRoutes from 'MainApp/client/routes';
import createStore from 'MainApp/common/store/createStore';
import configureStore from 'MainApp/common/configureStore';
import createInitialState from 'MainApp/server/frontend/createInitialState';
import config from 'MainApp/server/frontend/config';

let store;
let history;
let initialState;
let renderApp;


initialState = createInitialState();


// Create an enhanced history that syncs navigation events with the store
const historyHook = newHistory => {
    store = configureStore({initialState, history:newHistory});
    return history = syncHistoryWithStore(newHistory, store);
};

// Pass the state of the store as the object to be dehydrated server side
const dehydrateHook = () => store.getState();


// Take the rehydrated state and use it as initial state client side
const rehydrateHook = state => initialState = state;
// Pass additional props to give to the <Router /> component on the client
const clientProps = {

    htmlHook(html) {
        const head = ReactHelmet.rewind();
        return html.replace('<head>', '<head>' + head.title + head.base + head.meta + head.link + head.script);
    }
};

// Create a redux store and pass into the redux Provider wrapper
const wrapperHook = app => {
    return (renderApp = <Provider store={store}>{app}</Provider>)
};


const clientOptions = { props: clientProps, historyHook, rehydrateHook, wrapperHook};
const serverOptions = {historyHook, dehydrateHook,
    htmlHook(html) {
    const head = ReactHelmet.rewind();
    return html.replace('<head>', '<head>' + head.title + head.base + head.meta + head.link + head.script);
}};

ReactRouterSSR.Run(AppRoutes, clientOptions, serverOptions);






