import Multibase from 'multibase';
import Multicodec from 'multicodec';

export function encodeKey(key) {
  return new TextDecoder().decode(
    Multibase.encode(
      'base58btc',
      Multicodec.addPrefix('ed25519-pub', key)
    )
  );
}
