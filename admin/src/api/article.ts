import request from "@/utils/request";

export function getArticles(params: IPage) {
  return request({
    url: "/article/list",
    method: "get",
    params
  });
}

export function getArticle(id: number) {
  return request({
    url: `/article/${id}`,
    method: "get"
  });
}

export function saveArticle(data: ISaveArticle) {
  return request({
    url: `/article`,
    method: "post",
    data
  });
}

export function updateArticle(data: ISaveArticle) {
  return request({
    url: `/article/${data.id}`,
    method: "put",
    data
  });
}

export function deleteArticle(id: number) {
  return request({
    url: `/article/${id}`,
    method: "delete"
  });
}
