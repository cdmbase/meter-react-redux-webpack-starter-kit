const bunyan = require('bunyan');
const isMeteor = require('./util');

function MyRawStream() {
}

MyRawStream.prototype.write = function (rec) {
  if (!rec) {
    return undefined;
  }
  var recObj;
  if (rec instanceof Object) {
    recObj = rec;
  } else {
    recObj = JSON.parse(rec);
  }
  console.log('[%s] %s: %s',
        recObj.time,
        bunyan.nameFromLevel[recObj.level],
        recObj.msg);
};

const logger = bunyan.createLogger({
  name: 'app',
  time: Date.now(),
  stream: new MyRawStream(),
  type: 'raw',
  level: isMeteor() && Meteor.settings.public.logLevel || 'info',
});
module.exports = logger;
