import ApplicationAdapter from './application';
import { encodeKey } from '../util';

export default class SubjectAdapter extends ApplicationAdapter {
  generateIdForRecord(store, type, inputProperties) {
    const methodSpecificId = encodeKey(inputProperties.publicKey);
    const controller = `did:key:${methodSpecificId}`;
    const id = `${controller}#${methodSpecificId}`;
    return id;
  }
}
