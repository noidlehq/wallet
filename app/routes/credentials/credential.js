import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class CredentialRoute extends Route {
  @service store;

  model({ credential_id }) {
    return this.store.findRecord('credential', credential_id, {
      include: 'manifest',
    });
  }
}
