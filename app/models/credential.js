import Model, { attr, belongsTo } from '@ember-data/model';

export default class CredentialModel extends Model {
  @attr('moment') issuanceDate;
  @attr('moment') expirationDate;
  @attr issuer;
  @belongsTo('subject') subject;
  @attr type;
  @belongsTo('manifest') manifest;
  @attr status;
  @attr proof;
}
