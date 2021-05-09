export interface IUserInfo {
  info: {
    authorName: string
    avatar: string
    slogan: string
    url: string
  }
  tagCount: number
  categoryCount: number
  articleCount: number
}

export interface ICategory {
  id: number
  name: string
  alias: string
  description: string
  articleCount: string
}

export interface ITag {
  id: number
  name: string
  alias: string
  description: string
}

export interface IArchive {
  name: string
  articleCount: string
}

export interface IRecent {
  ctime: string
  utime: string
  id: number
  title: string
  description: string
  thumb: string
  views: number
}

export interface IArticleItem {
  id: number
  title: string
  description: string
  content: string
  thumb: string
  views: number
  ctime: string
  utime: string
}

export interface IArticleListResult {
  page: number
  pageSize: number
  count: number
  list: IArticleItem[]
}

export interface IArticleResult {
  ctime: string
  utime: string
  id: 1
  title: string
  description: string
  contentHtml: string
  thumb: string
  views: number
  user: {
    ctime: string
    utime: string
    id: number
    username: string
    authorName: string
    type: string
    avatar: string
    slogan: string
    url: string
    mail: string
  }
}
