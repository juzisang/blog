import { createHash } from 'crypto';

export function encryptPwd(str) {
  return createHash('md5')
    .update(str)
    .digest('hex');
}
