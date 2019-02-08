import request from '@/utils/request';

export function getArticles(params: IArticleQuery) {
  return request({
    url: '/article/list',
    method: 'get',
    params,
  });
}

export function getArticle(aid: number) {
  return request({
    url: `/article/${aid}`,
    method: 'get',
  });
}

export function saveArticle(data: ISaveArticle) {
  return request({
    url: `/article`,
    method: 'post',
    data,
  });
}

export function updateArticle(aid: number, data: ISaveArticle) {
  return request({
    url: `/article/${aid}`,
    method: 'put',
    data,
  });
}

export function deleteArticle(aid: number) {
  return request({
    url: `/article/delete/${aid}`,
    method: 'delete',
  });
}

export function publishArticle(aid: number) {
  return request({
    url: `/article/publish/${aid}`,
    method: 'put',
  });
}
