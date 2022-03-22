import Component from '@glimmer/component';

export default class IdentitiesFilterComponent extends Component {
  get results() {
    let { identities } = this.args;

    // filter identities

    return identities;
  }
}
