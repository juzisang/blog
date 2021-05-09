<script context="module" lang="ts">
  import { fetchGet } from '../utils/fetch'
  import type { Preload } from '@sapper/common'

  export const preload: Preload = async function (this, page, session) {
    const userInfo = await fetchGet<IUserInfo>('/user/info')
    const categoryList = await fetchGet<ICategory[]>('/category/list')
    const tagList = await fetchGet<ITag[]>('/tag/list')
    const archiveList = await fetchGet<IArchive>('/article/archives')
    const recentList = await fetchGet('/article/recent')

    return { userInfo, categoryList, tagList, archiveList, recentList }
  }
</script>

<script lang="ts">
  import Navbar from '../components/Navbar.svelte'
  import AuthorInfo from '../components/AuthorInfo.svelte'
  import Categorys from '../components/Categorys.svelte'
  import Tags from '../components/Tags.svelte'
  import Archives from '../components/Archives.svelte'
  import Recent from '../components/Recent.svelte'
  import type { ICategory, IUserInfo, ITag, IArchive, IRecent } from '../api.interface'

  export let userInfo: IUserInfo
  export let categoryList: ICategory[]
  export let tagList: ITag[]
  export let archiveList: IArchive[]
  export let recentList: IRecent[]
</script>

<Navbar />
<div class="container">
  <aside class="left-col">
    <AuthorInfo {userInfo} />
    <Categorys {categoryList} />
    <Tags {tagList} />
  </aside>
  <main class="main-col">
    <slot />
  </main>
  <aside class="right-col">
    <Recent {recentList} />
    <Archives {archiveList} />
  </aside>
</div>

<style lang="less">
  @import '../styles/cover.less';
  .container {
    padding-top: 32px;
    display: flex;
    .left-col,
    .right-col {
      position: sticky;
      top: 20px;
      z-index: 10;
      width: 23.5%;
      padding: 0 10px;
      box-sizing: border-box;
      align-self: flex-start;
    }
    .main-col {
      width: 53%;
      padding: 0 10px;
      box-sizing: border-box;
    }
  }
</style>
