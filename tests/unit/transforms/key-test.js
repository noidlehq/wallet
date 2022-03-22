import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Transform | key', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let transform = this.owner.lookup('transform:key');
    assert.ok(transform);
  });
});
