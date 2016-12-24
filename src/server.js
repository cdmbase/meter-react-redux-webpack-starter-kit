const bunyan = require('bunyan');
const isMeteor = require('./util');

var streams;
const level = (isMeteor() && Meteor.settings.public.logLevel) || process.env.logLevel;

const app = process.env.APP_NAME || 'app';
if (process.env.NODE_ENV === 'production') {
    // TODO: Get the  settings from Meteor.settings or node environment
  console.log('It is production');

  streams = [{
    type: 'rotating-file',
    path: `${app}.log`,
    level: level || 'info',
    period: '1d',   // daily rotation
    count: 3,        // keep 3 back copies    }
  }];
} else {
  const bunyanDebugStream = require('bunyan-debug-stream');
  // stream: process.stdout,
  const stream = bunyanDebugStream({
    basepath: __dirname, // this should be the root folder of your project.
    forceColor: true,
  });
  streams = [{
    level: level || 'debug',
    type: 'stream',
    stream,
  }];
}
const logger = bunyan.createLogger({
  name: app,
  time: Date,
  streams
});


module.exports = logger;
