export function debounce(call: any, delay: number) {
    let timer: NodeJS.Timeout;
  
    return function (...args: any[]) {
      if (timer) {
        clearTimeout(timer);
      }
  
      timer = setTimeout(() => {
        call(...args);
      }, delay);
    };
  }
  