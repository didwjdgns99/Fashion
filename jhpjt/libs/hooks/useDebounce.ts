"use client";

type useDebounceProps = {
  value: string;
  delay?: number;
};

import { useState, useEffect } from "react";

export default function useDebounce({ value, delay = 500 }: useDebounceProps) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
