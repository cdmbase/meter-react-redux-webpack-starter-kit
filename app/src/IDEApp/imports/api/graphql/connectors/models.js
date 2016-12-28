import { Boxes as BoxesConnector, Servers as ServersConnector } from '../../collections';
import logger from 'cdm-logger';

class Model {
  constructor({ connector }) {
    this.connector = connector;
  }
  findOne(id) {
    id = id || {};
    return this.connector.findOne(id);
  }
  find() {
    return this.connector.find().fetch();
  }
  upsert(id, content) {
    const result = this.connector.upsert({ _id: id }, {
      $set: { content },
    });
    logger.debug('Id and content ', result);
    return this.connector.findOne(result.insertedId);
  }
  insert({ ...content }) {
    const result = this.connector.insert({ ...content });
    return this.connector.findOne(result);
  }
}

export const models = {
  Boxes: new Model({ connector: BoxesConnector }),
  Servers: new Model({ connector: ServersConnector }),
};
