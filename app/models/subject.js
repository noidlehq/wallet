import Model, { attr, belongsTo, hasMany } from '@ember-data/model';
import { encodeKey } from '../util';

export default class SubjectModel extends Model {
  @belongsTo('subject', { inverse: 'children' }) controller;
  @attr('key') publicKey;
  @attr('key') privateKey;
  @hasMany('subject', { inverse: 'controller' }) children;
  get shortened() {
    return encodeKey(this.publicKey).slice(4,15);
  }
}
