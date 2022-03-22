import JSONAPIAdapter from '@ember-data/adapter/json-api';
import { inject as service } from '@ember/service';

export default class ApplicationAdapter extends JSONAPIAdapter {
  @service indexedDb;

  createRecord(store, type, snapshot) {
    let { modelName } = type;
    let { data } = this.serialize(snapshot, { includeId: true });
    return this.indexedDb.save(modelName, data.id, data);
  }

  findAll(store, type) {
    let { modelName } = type;
    return this.indexedDb.findAll(modelName).then((records) => {
      return this._normalizeArray(records);
    });
  }

  _normalizeArray(records) {
    if (!records) return { data: [] };
    return { data: records };
  }
}
