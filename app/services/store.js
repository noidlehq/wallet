import Store from '@ember-data/store';
import { NotFoundError } from '../utils';

export default class ApplicationStore extends Store {
  findOrCreateRecord(modelName, id, inputProperties) {
    try {
      return this.findRecord(modelName, id);
    } catch (e) {
      debugger;
      if (e instanceof NotFoundError) {
        return this.createRecord(modelName, inputProperties);
      }
      throw e;
    }
  }
}
