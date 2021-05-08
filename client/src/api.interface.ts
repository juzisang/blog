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
