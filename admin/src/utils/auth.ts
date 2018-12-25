const TokenKey = "Token";

export function getToken() {
  const token = window.localStorage.getItem(TokenKey);
  return token ? `bearer ${token}` : null;
}

export function setToken(token: string) {
  return window.localStorage.setItem(TokenKey, token);
}

export function removeToken() {
  return window.localStorage.removeItem(TokenKey);
}
