import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service indexedDb;

  async beforeModel() {
    return await this.indexedDb.setup();
  }
}
