import request from "@/utils/request";

export function getTags() {
  return request({
    url: "/metas/tags",
    method: "get"
  });
}

export function getTag(id: number) {
  return request({
    url: `/metas/tag/${id}`,
    method: "get"
  });
}

export function updateTag(data: ISaveMeta) {
  return request({
    url: `/metas/tag/${data.id}`,
    method: "put",
    data
  });
}

export function deleteTag(id: number) {
  return request({
    url: `/metas/tag/${id}`,
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
