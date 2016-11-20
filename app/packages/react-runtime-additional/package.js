Package.describe({
  name: 'cdmbase:react-runtime-additional',
  version: '15.0.1',
  // Brief, one-line summary of the package.
  summary: "All other React library that will be imported in meteor bundle",
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/meteor/react-packages',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md',
});

Package.onUse(function(api) {
  api.versionsFrom('1.3');
  api.use(['ecmascript', 'tmeasday:check-npm-versions@0.2.0', 'underscore']);

  api.mainModule('react-runtime-additional.js');

  api.export('ReactRouter');
});
