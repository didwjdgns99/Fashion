import { useEffect } from "react";

export default function ScrollFix() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}
