import Component from '@glimmer/component';

export default class ManifestComponent extends Component {
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
}
