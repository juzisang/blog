export function ellipsis(str: string, lenght: number) {
  return str.length > lenght ? `${str.slice(0, lenght)}...` : str;
}

export function debounce(fn: Function, delay: number) {
  let timer: any = null;
  return function() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      fn.apply(null);
    }, delay);
  };
}
