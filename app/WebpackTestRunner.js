// This file is auto-generated
// Any change will be overriden
const ignoreTarget = Meteor.isServer ? 'client' : 'server';

let testFiles = [];

if (Meteor.isAppTest) {
  testFiles = testFiles.concat(require.context('./lib', true, /.(test|spec|app-test|app-spec)(s)?.(.+)$/i).keys()).map(file => './lib' + file.substr(1));
  testFiles = testFiles.concat(require.context('./private', true, /.(test|spec|app-test|app-spec)(s)?.(.+)$/i).keys()).map(file => './private' + file.substr(1));
  testFiles = testFiles.concat(require.context('./public', true, /.(test|spec|app-test|app-spec)(s)?.(.+)$/i).keys()).map(file => './public' + file.substr(1));
  testFiles = testFiles.concat(require.context('./src', true, /.(test|spec|app-test|app-spec)(s)?.(.+)$/i).keys()).map(file => './src' + file.substr(1));
} else {
  testFiles = testFiles.concat(require.context('./lib', true, /.(test|spec)(s)?.(.+)$/i).keys()).map(file => './lib' + file.substr(1));
  testFiles = testFiles.concat(require.context('./private', true, /.(test|spec)(s)?.(.+)$/i).keys()).map(file => './private' + file.substr(1));
  testFiles = testFiles.concat(require.context('./public', true, /.(test|spec)(s)?.(.+)$/i).keys()).map(file => './public' + file.substr(1));
  testFiles = testFiles.concat(require.context('./src', true, /.(test|spec)(s)?.(.+)$/i).keys()).map(file => './src' + file.substr(1));
}

testFiles
  .filter(file => file.indexOf('/' + ignoreTarget + '/') < 0)
  .map(file => require(file));
