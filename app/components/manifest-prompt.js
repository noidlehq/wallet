import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import moment from 'moment';
import { generateDid } from '../utils';
import {
  buildCredentialApplication,
  decodeVerifiablePresentation,
} from 'verite';

export default class ManifestPromptComponent extends Component {
  @service router;
  @service store;

  get od() {
    return this.args.manifest.body.manifest.output_descriptors[0];
  }

  get hero() {
    return this.od.styles.hero;
  }

  get name() {
    return this.od.name;
  }

  get bgColor() {
    return this.od.styles.background.color;
  }

  get color() {
    return this.od.styles.text.color;
  }

  get description() {
    return this.od.description;
  }

  @action
  async requestIssuance() {
    let replyUrl = this.args.manifest.reply_url;
    let manifest, subject, vc;

    try {
      let mfst = this.args.manifest.body.manifest;
      let issuer = mfst.issuer;
      manifest = this.store.createRecord('manifest', {
        issuer,
        outputDescriptors: mfst.output_descriptors,
        presentationDefinition: mfst.presentation_definition,
        raw: mfst,
      });

      subject = this.store.createRecord('subject', generateDid());

      const body = await buildCredentialApplication(
        {
          subject: subject.id,
          privateKey: subject.privateKey,
        },
        mfst
      );

      const response = await fetch(replyUrl, { method: 'POST', body });
      const text = await response.text();
      const vp = await decodeVerifiablePresentation(text);
      const credentials = vp.verifiableCredential ?? [];
      const cred = credentials[0];

      vc = this.store.createRecord('credential', {
        issuanceDate: moment.utc(cred.issuanceDate),
        expirationDate: moment.utc(cred.expirationDate),
        proof: cred.proof,
        issuer: cred.issuer,
        status: cred.credentialStatus,
        raw: cred,
        manifest,
        subject,
      });

      await Promise.all([manifest.save(), subject.save(), vc.save()]);

      this.router.transitionTo('credentials.credential', vc);
    } catch (err) {
      // rollback
      // destroy manifest, vc, subject to ensure atomicity
      for (let record of [manifest, vc, subject]) {
        if (!record) continue;
        if (record.isNew) record.deleteRecord();
        else record.destroyRecord();
      }
      this.args.onError(err);
    } finally {
      this.args.onFinal();
    }
  }
}
