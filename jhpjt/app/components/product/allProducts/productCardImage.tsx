//show가되면 받아오도록 이미지를 csr로 뺴기
//인터섹션 옵저버는 감시대상 엘리먼트를 하나 정해서 그 대상이 보이는지 안보이는지에 따라 감시대상인지 아닌지 판별한다.
//이미 보여진 요소는 감시대상이 아니여서 해제하지 않으면 메모리 누수로 연결된다.
"use client";
//인터섹션 옵저버는 브라우저 api이므로 서버에서 실행 x

import Image from "next/image";
import { useState, useRef, useEffect } from "react";

type ImageProps = {
  src: string;
  alt: string;
};

export default function ProductCardImage({ src, alt }: ImageProps) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;

    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return; //뷰 포트에 들어오지 않으면 return
      setShow(true); //들어오면 true
      observer.disconnect(); // 한번 로드하면 더 감시할 필요 없어서 감시 해제
    });
    observer.observe(el);

    return () => {
      console.log("체크");
      observer.disconnect();
    }; // 언마운트 될 때 옵저버 해제 = 메모리 누수 , 불필요한 감시 방지
  }, []);

  return (
    <div
      ref={ref}
      className="relative w-full aspect-4/5 overflow-hidden rounded-2xl"
    >
      {show ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
          placeholder="empty"
        />
      ) : null}
    </div>
  );
}

//--------------------------------------------------------------

// import Image from "next/image";
// //import { useState, useRef, useEffect } from "react";

// type ImageProps = {
//   src: string;
//   alt: string;
// };

// export default function ProductCardImage({ src, alt }: ImageProps) {
//   // const ref = useRef(null);
//   // const [show, setShow] = useState(false);

//   // useEffect(() => {
//   //   const el = ref.current;

//   //   if (!el) return;

//   //   const observer = new IntersectionObserver(([entry]) => {
//   //     if (!entry.isIntersecting) return; //뷰 포트에 들어오지 않으면 return
//   //     setShow(true); //들어오면 true
//   //     observer.disconnect(); // 한번 로드하면 더 감시할 필요 없어서 감시 해제
//   //   });
//   //   observer.observe(el);

//   //   return () => {
//   //     console.log("체크");
//   //     observer.disconnect();
//   //   }; // 언마운트 될 때 옵저버 해제 = 메모리 누수 , 불필요한 감시 방지
//   // }, []);

//   return (
//     <div
//       // ref={ref}
//       className="relative w-full aspect-4/5 overflow-hidden rounded-2xl"
//     >
//       <Image
//         src={src}
//         alt={alt}
//         fill
//         className="object-cover"
//         sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
//         placeholder="empty"
//         loading="lazy"
//       />

//       {/* <Image
//         src={src}
//         alt={alt}
//         fill
//         className="object-cover"
//         loading="lazy" // 명시 (기본도 lazy인 경우가 많음)
//         placeholder="empty" // blurDataURL 없으면 empty 권장
//         sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
//       /> */}
//     </div>
//   );
// }
