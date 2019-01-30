import request from '@/utils/request';

export function getComments(aid: number, params: IPage) {
  return request({
    url: `/comment/${aid}`,
    method: 'get',
    params,
  });
}

export function addComment(aid: number, data: ISaveArticle) {
  return request({
    url: `/comment/${aid}`,
    method: 'post',
    data,
  });
}

export function updateComment(cid: number, state: string) {
  return request({
    url: `/comment/${cid}`,
    method: 'put',
    data: { state },
  });
}

export function deleteComment(cid: number) {
  return request({
    url: `/comment/${cid}`,
    method: 'delete',
  });
}
