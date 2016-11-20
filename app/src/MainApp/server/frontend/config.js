
//import nconf from 'nconf';
//
//// Use less-terrible seperator character
//nconf.env('__');
//
//// For local development, we can override defaults easily. Rename
//// src/common/_config.json to src/common/config.json and uncomment next line.
//// nconf.file('src/common/config.json');
//
//
//// Remember, never put secrets in the source code. Use environment variables for
//// production or src/common/config.json for development instead.
const config = {
    appName: "test",
    // Use appVersion defined in
    appVersion: process.env.appVersion,
    defaultLocale: 'en',
    googleAnalyticsId: Meteor.settings.public.googleAnalyticsId,
    isProduction: Meteor.isProduction,
    locales: ['en'],
    sentryUrl: Meteor.settings.public.sentryUrl,
};

export default config;

//export default nconf.get();