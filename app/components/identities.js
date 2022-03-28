import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { generateDid } from '../utils';

export default class IdentitiesComponent extends Component {
  @service store;

  @action
  createIdentity() {
    const subject = generateDid();
    this.store.createRecord('subject', subject).save();
  }
}
