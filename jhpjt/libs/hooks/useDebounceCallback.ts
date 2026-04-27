import { useRef } from "react";

export function useDebounceCallback(delay: number = 500) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const debounce = (callback: () => void) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      callback(); // 나중에 실행할 실제 작업 페이지에서 사용하게 되면 api요청에 해당
    }, delay);
  };

  return debounce;
}
