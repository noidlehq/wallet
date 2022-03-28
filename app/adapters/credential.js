import ApplicationAdapter from './application';
import { v4 } from 'uuid';

export default class CredentialAdapter extends ApplicationAdapter {
  generateIdForRecord() {
    return v4();
  }
}
