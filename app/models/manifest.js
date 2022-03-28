import Model, { attr } from '@ember-data/model';

export default class ManifestModel extends Model {
  @attr issuer;
  @attr outputDescriptors;
  @attr presentationDefinition;
  @attr raw;
}
