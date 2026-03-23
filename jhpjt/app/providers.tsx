"use client"; //브라우저 index DB에 저장 되야해서

import { QueryClient } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { get, set, del } from "idb-keyval";
export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        //쿼리 클라이언트 옵션으로 제어
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 10,
            refetchOnMount: false, //컴포넌트가 다시 마운트 될 때 자동 재요청 안함
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
          },
        },
      }),
  );

  const persister = useMemo(
    () =>
      //캐싱될 데이터 저장소 생성
      createAsyncStoragePersister({
        storage: {
          getItem: (key) => get(key), //persister가 캐시 가져올 때 key로 데이터를 가져온다.
          setItem: (key, value) => set(key, value), //persister가 캐시를 "저장할 때" IndexedDB에 key/value로 저장
          removeItem: (key) => del(key), // 키를 보고 캐시를 지워야 할 때(만료/초기화 등) IndexedDB에서 삭제
        },
      }),
    [],
  );

  return (
    <PersistQueryClientProvider
      persistOptions={{ persister, maxAge: 1000 * 60 * 10 }}
      client={queryClient}
    >
      {children}
    </PersistQueryClientProvider>
  );
}

//persister indexDB에 저장방법 및 어떻게 get/set/remove 할지 정의
//queryClient indexDB에 저장할 데이터
