import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | manifests/new', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:manifests/new');
    assert.ok(route);
  });
});
