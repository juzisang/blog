import { Component, Vue } from 'nuxt-property-decorator'
import * as style from '@/styles/index.scss'

@Component
export default class Index extends Vue {
  render() {
    return <div class={style.hello}>Hello Word</div>
  }
}
