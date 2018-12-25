interface ISaveUser {
  name: string;
  email: string;
  slogan: string;
  avatar: string;
  url: string;
}

interface IUpdatePwd {
  name: string;
  oldPassword: string;
  newPassword: string;
}
