import { Component, Vue } from 'vue-property-decorator';
import { homeRouter } from '@/router';

@Component({})
export default class ContentRouter extends Vue {
  private get noCacheViews() {
    return homeRouter
      .filter(item => item.children && item.children.length > 0)
      .flatMap(item => item.children as any)
      .filter(item => item.meta.cache === false)
      .map(item => item.name);
  }

  render() {
    return (
      <keep-alive max={10} exclude={this.noCacheViews}>
        <router-view />
      </keep-alive>
    );
  }
}
