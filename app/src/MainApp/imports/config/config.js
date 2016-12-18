/* @flow */
// www.andrewsouthpaw.com/2015/02/08/environment-variables/
// import nconf from 'nconf';
//
// // Use less-terrible seperator character
// nconf.env('__');
//
// // For local development, we can override defaults easily. Rename
// // src/common/_config.json to src/common/config.json and uncomment next line.
// // nconf.file('src/common/config.json');
//
//
// // Remember, never put secrets in the source code. Use environment variables for
// // production or src/common/config.json for development instead.
// nconf.defaults({

// Customized for METEOR
const config = {
  appName: require('../../../../package.json').name,
  // Use appVersion defined in
  appVersion: process.env.appVersion,
  defaultLocale: 'en',
  googleAnalyticsId: Meteor.settings.public.googleAnalyticsId,
  isProduction: process.env.NODE_ENV === 'production',
  locales: ['en'],
  // Enable hot reload on remote device. Note it prevents offline testing,
  // because it depends on ip.address(), which doesn't work with disabled wifi.
  // How do we access a website running on localhost from mobile browser?
  // stackoverflow.com/questions/3132105
  remoteHotReload: false,
  sentryUrl: Meteor.settings.public.sentryUrl,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT || 3002,
};

export default config;

