import Transform from '@ember-data/serializer/transform';

export default class KeyTransform extends Transform {
  deserialize(serialized) {
    if (serialized) return new Uint8Array(serialized.split(','));
  }

  serialize(deserialized) {
    if (deserialized) return deserialized.toString();
  }
}
