# wallet

Wallet or personal data manager.

## Vision

Wallet that holds your personal data to transact with services that either want to customize their app's experience based on whatever personal data you are willing to share.

Examples:
- Rules to generate your avatar
- Health data
- Calendar
- Musical taste

Beyond reading your data, those apps can also write to your personal data store. The wallet therefore needs to have an always-online twin in the cloud with which your local wallet syncs whenever it boots up.

Interested parties should be able to interface with your remote twin and see what kind of assets you offer, and then request those from you. In the event of a request, your digital twin will ping you, or you can set up rules whereby you may let your remote agent automatically handle requests from you.

Authorization policies may for instance involve financial transactions. You may only want to automate the authorization of a transaction if the requester presents some kind of credential, otherwise you will ask your cloud agent to check in with you about the request (eg, via email, or text, or smartphone notification).

Authorization will be mediated by credentials that the wallet holder or their agent issues to interested parties.

Your assets also are thought of as "credentials" in the sense that verifiable credentials are just [verifiable containers](https://rufftimo.medium.com/verifiable-credentials-arent-credentials-they-re-containers-fab5b3ae5c0). All your assets are wrapped into self-issued verifiable containers, so that interested parties that access them can verify that they are yours.

## TODO

- [x] Create key DIDs and store them locally
- [ ] Issue credentials with either an existing DID or a new one for each tx
- [ ] Design process for deploying a personal data store on AWS
- [ ] Sync between local wallet and remote wallet
- [ ] Authorization: have your cloud agent send you push notifications upon third party request
- [ ] Policies for automating authorization (eg, smart contract that gives out an authorization VC in exchange for the presentation of some VC)

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://cli.emberjs.com/release/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone <repository-url>` this repository
* `cd wallet`
* `npm install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Linting

* `npm run lint`
* `npm run lint:fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://cli.emberjs.com/release/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
