export interface IUser {
  id: number
  username: string
  avatar: string
  slogan?: any
  url?: any
  mail?: any
}

export interface ITag {
  id: number
  name: string
  alias: string
  description: string
}

export interface ICategory {
  id: number
  name: string
  alias: string
  description: string
}

export interface IArticle {
  ctime: Date
  utime: Date
  title: string
  description: string
  content: string
  thumb: string
  viewNumber: number
  giveNumber: number
  user: IUser
  tags: ITag[]
  category: ICategory
}