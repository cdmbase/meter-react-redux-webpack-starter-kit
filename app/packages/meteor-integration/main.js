
if (Meteor.isClient) {
  require('./main-client').default;
} else {
  require('./main-server').default;
}
