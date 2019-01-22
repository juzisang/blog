import request from "@/utils/request";

export function getTags() {
  return request({
    url: "/metas/tags",
    method: "get"
  });
}

export function getTag(params: IQueryMeta) {
  return request({
    url: `/metas/tag`,
    method: "get",
    params
  });
}

export function updateTag(data: ISaveMeta) {
  return request({
    url: `/metas/tag/${data.aid}`,
    method: "put",
    data
  });
}

export function deleteTag(mid: number) {
  return request({
    url: `/metas/tag/${mid}`,
    method: "delete"
  });
}

export function addTag(data: ISaveMeta) {
  return request({
    url: `/metas/tag`,
    method: "post",
    data
  });
}
