import Transform from '@ember-data/serializer/transform';

export default class KeyTransform extends Transform {
  deserialize(serialized) {
    return new Uint8Array(serialized.split(','));
  }

  serialize(deserialized) {
    return deserialized.toString();
  }
}
