"use client";
import { useState, useRef } from "react";
import Avatar from "./Avatar";
import fillCamera from "@/public/image/fillCamera.svg";
import Image from "next/image";
import usePatchMyImage from "@/libs/hooks/usePatchMyImage";

type AvatarUploadProps = {
  initialImage: string;
  fallbackText: string;
};

export default function AvatarUpload({
  initialImage,
  fallbackText,
}: AvatarUploadProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(
    initialImage ?? null,
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate, isPending } = usePatchMyImage();

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreviewImage(url);

    const formData = new FormData();

    formData.append("profileImage", file);
    mutate(formData);
  };

  return (
    <>
      <div className="relative cursor-pointer" onClick={handleClick}>
        <Avatar
          size="lg"
          src={previewImage ?? undefined}
          fallback={fallbackText}
          className="text-white text-2xl border border-gray-600"
        />
        <div className="absolute bottom-[0px] left-[47px] w-6 h-6 ">
          <Image src={fillCamera} alt="이미지 업로드 아이콘" />
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleChange}
        disabled={isPending}
      />
    </>
  );
}
