import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | credentials/request', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:credentials/request');
    assert.ok(route);
  });
});
