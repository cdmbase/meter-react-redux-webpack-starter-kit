import fs from 'fs';
import path from 'path';

const descriptorsToMessages = descriptors =>
    descriptors.reduce((previous, { defaultMessage, id }) => ({
      ...previous, [id]: defaultMessage,
    }), {});

const loadMessages = (options) => {
  const {
        includeDefault = false,
        } = options || {};
  const isDictionary = fileName =>
        path.extname(fileName) === '.js' &&
        (includeDefault || !fileName.startsWith('_'));
  return fs.readdirSync(`${process.env.PWD}/public/messages`)
    .filter(isDictionary)
    .map(fileName => ({
      descriptors: require(`../../../../public/messages/${fileName}`), // eslint-disable-line import/no-dynamic-require
      locale: fileName.split('.')[0],
    }))
    .reduce((previous, { descriptors, locale }) => ({
      ...previous, [locale]: descriptorsToMessages(descriptors),
    }), {});
};

export default loadMessages;
