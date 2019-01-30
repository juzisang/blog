import request from '@/utils/request';

export function getCategorys() {
  return request({
    url: '/metas/categorys',
    method: 'get',
  });
}

export function getCategory(params: IQueryMeta) {
  return request({
    url: `/metas/category`,
    method: 'get',
    params,
  });
}

export function updateCategory(mid: number, data: ISaveMeta) {
  return request({
    url: `/metas/category/${mid}`,
    method: 'put',
    data,
  });
}

export function deleteCategory(mid: number) {
  return request({
    url: `/metas/category/${mid}`,
    method: 'delete',
  });
}

export function addCategory(data: ISaveMeta) {
  return request({
    url: `/metas/category`,
    method: 'post',
    data,
  });
}
