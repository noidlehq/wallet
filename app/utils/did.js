import Multibase from 'multibase';
import Multicodec from 'multicodec';
import { randomDidKey } from 'verite';
import { randomBytes } from './crypto';

export function generateDid() {
  return randomDidKey(randomBytes);
}

export function encodeKey(key) {
  return new TextDecoder().decode(
    Multibase.encode('base58btc', Multicodec.addPrefix('ed25519-pub', key))
  );
}
