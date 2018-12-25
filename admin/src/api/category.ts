import request from "@/utils/request";

export function getCategorys() {
  return request({
    url: "/metas/tags",
    method: "get"
  });
}

export function getCategory(id: number) {
  return request({
    url: `/metas/tag/${id}`,
    method: "get"
  });
}

export function updateCategory(data: ISaveMeta) {
  return request({
    url: `/metas/tag/${data.id}`,
    method: "put",
    data
  });
}

export function deleteCategory(id: number) {
  return request({
    url: `/metas/tag/${id}`,
    method: "delete"
  });
}

export function addCategory(data: ISaveMeta) {
  return request({
    url: `/metas/tag`,
    method: "post",
    data
  });
}
