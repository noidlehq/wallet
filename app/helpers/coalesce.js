import { helper } from '@ember/component/helper';
import ObjectPath from 'object-path';

function coalesce(args) {
  let [obj, path, fallback] = args;
  if (!obj) return;
  if (path[0] == '$') {
    path = path.map((d) => d.split('.').slice(1).join('.'));
  }
  return ObjectPath.coalesce(obj, path, fallback);
}

export default helper(coalesce);
