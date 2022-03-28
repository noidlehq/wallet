import JSONAPIAdapter from '@ember-data/adapter/json-api';
import { inject as service } from '@ember/service';

export default class ApplicationAdapter extends JSONAPIAdapter {
  @service indexedDb;

  createRecord(store, type, snapshot) {
    let { modelName } = type;
    let { data } = this.serialize(snapshot, { includeId: true });
    this.indexedDb.save(modelName, data.id, data);
  }

  async queryRecord(store, type, query) {
    let { modelName } = type;
    const record = await this.indexedDb.queryRecord(modelName, query);
    return this._normalizeSingle(record);
  }

  async findAll(store, type) {
    let { modelName } = type;
    const records = await this.indexedDb.findAll(modelName);
    return this._normalizeArray(records);
  }

  async findRecord(store, type, id, snapshot) {
    let { modelName } = type;
    const record = await this.indexedDb.find(modelName, id);
    return this._normalizeSingle(record);
  }

  _normalizeArray(records) {
    if (!records) return { data: [] };
    return { data: records };
  }

  _normalizeSingle(record) {
    if (!record) return { data: null };
    return { data: record };
  }
}
