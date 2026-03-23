// "use client";

// import { useEffect } from "react";

// export default function useBodyScrollLock(isLocked: boolean) {
//   useEffect(() => {
//     if (!isLocked) return;
//     const html = document.documentElement;
//     const scrollY = window.scrollY;

//     const prevOverflow = html.style.overflow;
//     const prevPosition = html.style.position;
//     const prevTop = html.style.top;
//     const prevWidth = html.style.width;

//     // 🔒 html을 고정
//     html.style.overflow = "hidden";
//     html.style.position = "fixed";
//     html.style.top = `-${scrollY}px`;
//     html.style.width = "100%";
//     return () => {
//       html.style.overflow = prevOverflow;
//       html.style.position = prevPosition;
//       html.style.top = prevTop;
//       html.style.width = prevWidth;

//       window.scrollTo(0, scrollY);
//     };
//   }, [isLocked]);
// }

"use client";

import { useEffect } from "react";

export default function useScrollLonk(isLocked: boolean) {
  useEffect(() => {
    if (!isLocked) return;

    const html = document.documentElement;
    const scrollY = window.scrollY;

    const prevOverflow = html.style.overflow;
    const prevPosition = html.style.position;
    const prevTop = html.style.top;
    const prevWidth = html.style.width;

    html.style.overflow = "hidden";
    html.style.position = "fixed";
    html.style.top = `${scrollY}px`;
    html.style.width = "100%";

    return () => {
      html.style.overflow = prevOverflow;
      html.style.position = prevPosition;
      html.style.top = prevTop;
      html.style.width = prevWidth;

      window.scrollTo(0, scrollY);
    };
  }, [isLocked]);
}
