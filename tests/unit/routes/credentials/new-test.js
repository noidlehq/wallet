import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | credentials/new', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:credentials/new');
    assert.ok(route);
  });
});
