
if (Meteor.isClient) {
  require('./main-client.js').default;
} else {
  require('./main-server.js').default;
}
