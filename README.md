# wallet

Wallet + Cloud agent.

## Vision

Wallet interfaces with your personal data to transact with services that want to customize their app's experience based on whatever personal data you are willing to share.

Examples:
- Instantiate your avatar in VR
- Access your health data
- Manage your calendar
- Learn about your musical taste

Beyond reading your data, those apps can also write to your personal data store. The wallet therefore needs to have an always-online twin in the cloud with which your local device-bound wallet syncs whenever it boots up.

Interested parties should be able to interface with your remote twin and see what kind of assets you offer, and then request those from you. In the event of a request, your digital twin will ping you, or you can set up rules whereby you may let your remote agent automatically handle requests from you.

Authorization policies may for instance involve financial transactions. You may only want to automate the authorization of a transaction if the requester presents some kind of credential, otherwise you will ask your cloud agent to check in with you about the request (eg, via email, or text, or smartphone notification).

Authorization will be mediated by credentials that the wallet holder or their agent issues to interested parties.

Your assets also are thought of as "credentials" in the sense that verifiable credentials are just [verifiable containers](https://rufftimo.medium.com/verifiable-credentials-arent-credentials-they-re-containers-fab5b3ae5c0). All your assets are wrapped into self-issued verifiable containers, so that interested parties that access them can verify that they are yours.

## TODO

- [x] Create key DIDs and store them locally
- [x] Request credentials (via Presentation Exchange protocol)
- [x] Submit a credential to a service (via Presentation Exchange protocol)
- [ ] Implement Identity Hub (IH) with sync
- [ ] Wallet stores DIDs and VCs in IH
- [ ] Authenticate to a service
- [ ] Resolve DIDs
- [ ] Issue credentials
- [ ] Cloud agent with ability to ping edge agent
- [ ] Policies for automating authorization

## Installation

* `git clone <repository-url>` this repository
* `cd wallet`
* `npm install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Running Tests

* `ember test`
* `ember test --server`

### Linting

* `npm run lint`
* `npm run lint:fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)
