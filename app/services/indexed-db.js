import Service from '@ember/service';
import Dexie from 'dexie';
import { pluralize } from 'ember-inflector';
import { NotFoundError } from '../utils';

export default class IndexedDbService extends Service {
  dbName = 'noidle-db';

  constructor() {
    super(...arguments);
    this.db = new Dexie(this.dbName);
  }

  setup() {
    this.db.version(1).stores({
      subjects: 'id',
      credentials: 'id',
      manifests: 'id',
    });
    this.db.open();
  }

  findAll(type) {
    return this.db[pluralize(type)].toArray();
  }

  async find(type, id) {
    let record = await this.db[pluralize(type)].get(id);
    if (!record) throw new NotFoundError(`Record ${type}:${id} not found`);
    return record;
  }

  queryRecord(type, query) {
    return this.db[pluralize(type)].toCollection().first();
  }

  save(type, id, item) {
    debugger;
    this.db[pluralize(type)].put(item);
  }
}
