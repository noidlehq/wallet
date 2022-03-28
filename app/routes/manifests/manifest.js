import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ManifestRoute extends Route {
  @service store;

  model({ manifest_id }) {
    return this.store.findRecord('manifest', manifest_id);
  }
}
