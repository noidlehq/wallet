import EmberRouter from '@ember/routing/router';
import config from 'wallet/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('subjects', { path: '/identities' }, function () {
    this.route('new');
    this.route('subject', { path: '/:subject_id' });
  });
  this.route('credentials', function () {
    this.route('credential', { path: '/:credential_id' });
  });
});
