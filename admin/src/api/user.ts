import request from "@/utils/request";

export function login(data: {
  name: string;
  password: string;
}): Promise<IUserInfo> {
  return request({
    url: "/auth/login",
    method: "post",
    data
  });
}

export function getUserInfo(): Promise<IUserInfo> {
  return request({
    url: "/user",
    method: "get"
  });
}

export function updateUser(data: ISaveUser) {
  return request({
    url: "/user",
    method: "put",
    data
  });
}

export function updatePwd(data: IUpdatePwd) {
  return request({
    url: "/user/password",
    method: "put",
    data
  });
}
