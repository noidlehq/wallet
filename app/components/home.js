import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import {
  buildCredentialApplication,
  decodeVerifiablePresentation,
} from 'verite';
import fetch from 'fetch';
import { generateDid } from '../utils';
import moment from 'moment';

export default class ScannerWrapperComponent extends Component {
  @service router;
  @service store;

  @tracked devices = [];
  @tracked cameraError;
  @tracked scanError;
  @tracked credentialManifest;
  @tracked scanning = true;

  @action
  onScanError(error) {
    this.scanError = scanError;
  }

  @action
  onCamerasFound(devices) {
    this.devices = [...this.devices, ...devices];
  }

  @action
  onCamerasError(error) {
    this.error = error;
  }

  @action
  async onScanSuccess(result) {
    let parsed = JSON.parse(result.text);
    if (parsed.challengeTokenUrl) {
      const response = await fetch(parsed.challengeTokenUrl);
      this.credentialManifest = await response.json();
    }
    this.scanning = false;
  }

  @action
  async requestCredential() {
    let replyUrl = this.credentialManifest.reply_url;

    let mfst = this.credentialManifest.body.manifest;
    let issuer = mfst.issuer;
    let manifest = await this.store
      .createRecord('manifest', {
        issuer,
        outputDescriptors: mfst.output_descriptors,
        presentationDefinition: mfst.presentation_definition,
        raw: mfst,
      })
      .save();

    let subject =
      (await this.store.queryRecord('subject', {})) ??
      this.store.createRecord('subject', generateDid());
    if (subject.isNew) await subject.save();

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
    debugger;

    let vc = await this.store
      .createRecord('credential', {
        issuanceDate: moment.utc(cred.issuanceDate),
        expirationDate: moment.utc(cred.expirationDate),
        proof: cred.proof,
        issuer: cred.issuer,
        status: cred.credentialStatus,
        manifest,
        subject,
      })
      .save();

    this.router.transitionTo('credentials.credential', vc);
  }

  @action
  cancelCredential() {
    this.credentialManifest = null;
  }
}
