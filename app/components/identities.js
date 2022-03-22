import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import * as ed25519 from '@stablelib/ed25519';

export default class IdentitiesComponent extends Component {
  @service store;

  @action createIdentity() {
    const { publicKey, secretKey } = ed25519.generateKeyPair();
    let record = this.store
      .createRecord('subject', {
        publicKey,
        privateKey: secretKey,
      });
    record.controller = record;
    record.save();
  }
}
