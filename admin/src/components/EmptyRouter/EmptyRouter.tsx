import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class EmptyRouter extends Vue {
  render() {
    return <router-view />;
  }
}
