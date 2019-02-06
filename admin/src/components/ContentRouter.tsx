import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class ContentRouter extends Vue {
  render() {
    return (
      <keep-alive>
        <router-view />
      </keep-alive>
    );
  }
}
