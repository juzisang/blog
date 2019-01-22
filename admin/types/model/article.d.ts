interface ISaveArticle {
  title: string;
  keywords: string;
  description: string;
  content: string;
  thumb: string;
  state: string;
  category: number;
  tags: Array<string>;
}
