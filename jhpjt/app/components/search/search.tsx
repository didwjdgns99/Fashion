"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import searchIcon from "@/public/image/searchIcon.png";
import useDebounce from "@/libs/hooks/useDebounce";
import FilterBtn from "../filterBtn";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CATEGORIES } from "@/libs/types/category";
type SearchProps = {
  defaultValue?: string;
  category: string;
};

export default function Search({
  defaultValue = "",
  category = "",
}: SearchProps) {
  const [keyword, setKeyword] = useState(defaultValue); //사용자가 검색한 키워드가 될 value 초기값은 ""
  const debounceKeyword = useDebounce({ value: keyword, delay: 500 }); //debounce된 키워드

  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const parmas = new URLSearchParams(searchParams.toString());
    const trimmedKeyword = debounceKeyword.trim();

    if (trimmedKeyword) {
      parmas.set("keyword", trimmedKeyword);
    } else {
      parmas.delete("keyword");
    }

    parmas.delete("cursor");

    router.replace(`${pathName}?${parmas.toString()}`);
  }, []);

  const handleCategoryClick = (setCategory: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (setCategory) {
      params.set("category", setCategory);
    } else {
      params.delete("category");
    }
    router.push(`${pathName}?${params.toString()}`);
  };

  return (
    <div className="relative flex flex-col px-4 max-w-[750px] w-full mt-4">
      <div>
        <input
          className="w-full border rounded-xl px-3 py-2 shadow-xl"
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="상품명을 검색하세요"
        />

        <Image
          src={searchIcon}
          alt="검색 아이콘"
          className="absolute w-6 h-6 right-8 top-2"
        />
      </div>
      <div className="flex justify-start gap-2 mb-2">
        <FilterBtn
          label="전체"
          isActive={category === ""}
          onClick={() => handleCategoryClick("")}
        />
        {CATEGORIES.map((item) => (
          <FilterBtn
            key={item}
            label={item}
            isActive={category === item}
            onClick={() => handleCategoryClick(item)}
          />
        ))}
      </div>
    </div>
  );
}
