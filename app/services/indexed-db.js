import Service from '@ember/service';
import Dexie from 'dexie';
import { pluralize } from 'ember-inflector';

export default class IndexedDbService extends Service {
  dbName = 'noidle-db';

  constructor() {
    super(...arguments);
    this.db = new Dexie(this.dbName);
  }

  async setup() {
    this.db.version(21113).stores({ subjects: 'id' });
    await this.db.open();
  }

  findAll(type) {
    return this.db[pluralize(type)].toArray();
  }

  find(type, id) {
    return this.db[pluralize(type)].get(id);
  }

  save(type, id, item) {
    return this.db[pluralize(type)].put(item);
  }
}
