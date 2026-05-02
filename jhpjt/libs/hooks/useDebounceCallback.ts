import { useRef, useEffect } from "react";

export function useDebounceCallback(delay: number = 500) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const debounce = (callback: () => void) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      callback(); // 나중에 실행할 실제 작업 페이지에서 사용하게 되면 api요청에 해당
      timerRef.current = null; // callbaack 후 타이머 초기화
    }, delay);
  };
  useEffect(() => {
    return () => {
      //언마운트 시 타이머 정리
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);
  return debounce;
}
