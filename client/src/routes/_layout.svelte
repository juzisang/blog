<script context="module" lang="ts">
  import { get } from '../utils/fetch'
  import type { Preload } from '@sapper/common'

  export const preload: Preload = async function (this, page, session) {
    const userInfo = await get<IUserInfo>('/user/info')
    const categoryList = await get<ICategory[]>('/category/list')
    const tagList = await get<ITag[]>('/tag/list')

    return { userInfo, categoryList, tagList }
  }
</script>

<script lang="ts">
  import Navbar from '../components/Navbar.svelte'
  import AuthorInfo from '../components/AuthorInfo.svelte'
  import Categorys from '../components/Categorys.svelte'
  import Tags from '../components/Tags.svelte'
  import type { ICategory, IUserInfo, ITag } from '../api.interface'

  export let userInfo: IUserInfo
  export let categoryList: ICategory[]
  export let tagList: ITag[]
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
    <div />
  </aside>
</div>

<style lang="less">
  .container {
    padding-top: 32px;
    display: flex;
    .left-col,
    .right-col {
      width: 23.5%;
      padding: 0 10px;
      box-sizing: border-box;
    }
    .main-col {
      width: 53%;
      padding: 0 10px;
      box-sizing: border-box;
    }
  }
</style>
