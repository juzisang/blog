export function ellipsis(str: string, lenght: number) {
  return str.length > lenght ? `${str.slice(0, lenght)}...` : str;
}
