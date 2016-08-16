var ReactRouterSSR;

if (Meteor.isClient) {
    ReactRouterSSR = require('./client.jsx').default;
} else {
    ReactRouterSSR = require('./server.jsx').default;
}

export default ReactRouterSSR;