import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import fetch from 'fetch';

async function handleScan(parsed) {
  if (parsed.challengeTokenUrl) {
    const response = await fetch(parsed.challengeTokenUrl);
    return response.json();
  }
}

export default class HomeComponent extends Component {
  @service router;
  @service store;

  @tracked devices = [];
  @tracked cameraError;
  @tracked scanError;
  @tracked scanning = true;

  @tracked credentialManifest;
  @tracked issuanceError;

  @tracked verificationOffer;
  @tracked verificationError;

  @action
  setScanError(error) {
    this.scanError = scanError;
  }

  @action
  setDevices(devices) {
    this.devices = [...this.devices, ...devices];
  }

  @action
  setCamerasError(error) {
    this.error = error;
  }

  @action
  async processCode(result) {
    let parsed = JSON.parse(result.text);
    const response = await handleScan(parsed);
    if (response.body.manifest) this.credentialManifest = response;
    if (response.body.presentation_definition)
      this.verificationOffer = response;
    this.scanning = false;
    debugger;
  }

  @action
  finalizeIssuance() {
    debugger;
    this.credentialManifest = null;
    this.scanning = true;
  }

  @action
  setIssuanceError(error) {
    this.issuanceError = error;
  }

  @action
  finalizeVerification() {
    this.verificationOffer = null;
    this.scanning = true;
  }

  @action
  setVerificationError(error) {
    this.verificationError = error;
  }
}
