import Model, { attr } from '@ember-data/model';
import { encodeKey } from '../lib/verite';

export default class SubjectModel extends Model {
  @attr('string') controller;
  @attr('string') name;
  @attr('key') publicKey;
  @attr('key') privateKey;
  get shortened() {
    return encodeKey(this.publicKey).slice(4, 15);
  }
}
