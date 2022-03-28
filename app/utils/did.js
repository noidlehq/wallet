import { randomDidKey } from 'verite';
import { randomBytes } from './crypto';

export function generateDid() {
  return randomDidKey(randomBytes);
}
