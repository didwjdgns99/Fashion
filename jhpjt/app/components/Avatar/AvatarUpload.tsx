"use client";
import { useState, useRef } from "react";
import Avatar from "./Avatar";
import fillCamera from "@/public/image/fillCamera.svg";
import Image from "next/image";
import { usePatchMyImage, useDeleteMyImage } from "@/libs/hooks/useMyImage";
import UserModal from "../userModal/userModal";
import imageCompression from "browser-image-compression";
import { useUser } from "@/libs/hooks/useUser";
// import { userImage } from "@/public/image/userImage.svg";

type AvatarUploadProps = {
  imageSrc: string | null;
  fallbackText: string;
};

export default function AvatarUpload({
  imageSrc,
  fallbackText,
}: AvatarUploadProps) {
  const { data } = useUser();
  const user = data?.user;
  const [previewImage, setPreviewImage] = useState<string | null>(
    imageSrc ?? null,
  );
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate: patchMutate, isPending: patchIsPending } = usePatchMyImage();
  const { mutate: deleteMutate, isPending: deleteIsPending } =
    useDeleteMyImage();
  const handleClick = () => {
    // inputRef.current?.click();
    setIsOpen(true);
  };

  const handleDelete = () => {
    setIsOpen(false);

    if (previewImage?.startsWith("blob:")) {
      URL.revokeObjectURL(previewImage);
    }
    setPreviewImage(null);
    deleteMutate();
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    if (previewImage?.startsWith("blob:")) {
      //미리보기 이미지는 blob URL로 생성되므로, 이전에 생성된 blob URL이 있다면 해제
      URL.revokeObjectURL(previewImage);
    }
    setPreviewImage(url);

    //imageCompression 에서 await을 쓰는이유 => 압축이 완료될 때까지 기다려야 하기 때문, 압축이 완료된 후에 formData에 추가해서 서버로 보내야 함
    const compressImage = await imageCompression(file, {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 500, //가로세로 중 넓은 쪽을 비율에 맞게 최대 500px로 줄이겠다.
      useWebWorker: true, // 압축 작업을 메인스레드가 아닌 webWorker에서 실행 => UI안 끊김, 버튼 스크롤 부드럽게 유지
    });

    const formData = new FormData();

    formData.append("profileImage", compressImage);
    patchMutate(formData);
  };

  return (
    <>
      <div className="relative cursor-pointer" onClick={handleClick}>
        <Avatar
          size="lg"
          name={user.nickName}
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
        disabled={patchIsPending || deleteIsPending}
      />
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setIsOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <UserModal
              onConfirm={handleDelete}
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
