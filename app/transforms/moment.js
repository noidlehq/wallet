import Transform from '@ember-data/serializer/transform';
import moment from 'moment';

export default class MomentTransform extends Transform {
  deserialize(serialized) {
    return moment.utc(serialized);
  }

  serialize(deserialized) {
    return deserialized.format();
  }
}
