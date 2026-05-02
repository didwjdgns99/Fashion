"use client";
import { useState, useRef } from "react";
import Avatar from "./Avatar";
import fillCamera from "@/public/image/fillCamera.svg";
import Image from "next/image";
import usePatchMyImage from "@/libs/hooks/usePatchMyImage";
import UserModal from "../userModal/userModal";
// import { userImage } from "@/public/image/userImage.svg";

type AvatarUploadProps = {
  imageSrc: string | null;
  fallbackText: string;
};

export default function AvatarUpload({
  imageSrc,
  fallbackText,
}: AvatarUploadProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(
    imageSrc ?? null,
  );
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate, isPending } = usePatchMyImage();

  const handleClick = () => {
    // inputRef.current?.click();
    setIsOpen(true);
  };

  // const defaultConfirmClick = () => {
  //   setIsOpen(false);
  //   setPreviewImage(userImage.src);

  //   const formData = new FormData();
  //   formData.append("profileImage", new Blob());
  //   mutate(formData);
  // };

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
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setIsOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <UserModal
              onConfirm={() => setIsOpen(false)}
              text="기본이미지로 변경"
              onConfirm2={() => {
                setIsOpen(false);
                inputRef.current?.click();
              }}
              text2="내 이미지로 변경"
            >
              프로필 이미지를 선택하세요.
            </UserModal>
          </div>
        </div>
      )}
    </>
  );
}
