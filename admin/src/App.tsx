import { Vue, Component } from 'vue-property-decorator';
import * as style from '@/styles/app.module.scss';

@Component
export default class App extends Vue {
  render() {
    return (
      <div id={style.app}>
        <router-view />
      </div>
    );
  }
}
