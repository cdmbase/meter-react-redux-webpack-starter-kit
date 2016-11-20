Package.describe({
  name: 'std:accounts-bootstrap',
  version: '1.2.0',
  summary: 'Bootstrap UI - Accounts UI for React in Meteor 1.3+',
  git: 'https://github.com/studiointeract/accounts-bootstrap',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3');
  api.use('ecmascript');
  api.use('underscore');
  api.use('std:accounts-ui@1.2.9');

  api.addFiles([
    'styles.css', 'social-buttons.css'
  ], 'client');

  api.mainModule('main.jsx');
});
