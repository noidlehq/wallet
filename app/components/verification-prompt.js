import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { generateDid } from '../utils';
import { buildPresentationSubmission } from 'verite';
import fetch from 'fetch';

export default class VerificationPromptComponent extends Component {
  @service router;
  @service store;

  @tracked credentials = [];
  @tracked credentialsFetched = false;

  @tracked success = false;

  get inputDescriptor() {
    return this.args.offer.body.presentation_definition.input_descriptors[0];
  }

  get name() {
    return this.inputDescriptor.name;
  }

  get purpose() {
    return this.inputDescriptor.purpose;
  }

  @action
  fetchCredentials() {
    this.credentials = this.store.findAll('credential');
    this.credentialsFetched = true;
  }

  @action
  async requestVerification(vc) {
    let replyUrl = this.args.offer.reply_url;
    let pd = this.args.offer.body.presentation_definition;
    let challenge = this.args.offer.body.challenge;
    let subject = await this.store.findRecord('subject', vc.subject.get('id'));
    try {
      const body = await buildPresentationSubmission(
        {
          subject: subject.id,
          privateKey: subject.privateKey,
        },
        pd,
        vc.raw,
        {
          challenge,
        }
      );

      const response = await fetch(replyUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body,
      });

      this.success = response.ok;
    } catch (err) {
      this.args.onError(err);
    }
  }
}
