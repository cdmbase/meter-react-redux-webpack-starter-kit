import config from './config';
import configReducer from '../../../common/config/reducer';
import deviceReducer from '../../../common/device/reducer';
import intlReducer from '../../../common/intl/reducer';
import loadMessages from '../intl/loadMessages';

let messages;

const descriptorsToMessages = descriptors =>
  descriptors.reduce((previous, { defaultMessage, id }) => ({
    ...previous, [id]: defaultMessage,
  }), {});


if (Meteor.isServer) {
  messages = loadMessages();
} else {
  const en = [{
    descriptors: require('../../../../public/messages/_default'), // eslint-disable-line import/no-dynamic-require
    locale: 'en',
  }];
  messages = en.reduce((previous, { descriptors, locale }) => ({
    ...previous, [locale]: descriptorsToMessages(descriptors),
  }), {});
}


const createInitialState = () => ({
  config: {
    ...configReducer(),
    appName: config.appName,
    appVersion: config.appVersion,
    sentryUrl: config.sentryUrl,
  },
  device: deviceReducer(),
  intl: {
    ...intlReducer(),
    currentLocale: config.defaultLocale,
    defaultLocale: config.defaultLocale,
    locales: config.locales,
    messages,
  },
});

export default createInitialState;
