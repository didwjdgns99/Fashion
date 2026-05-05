import { getMeAction } from "@/app/actions/getMe.action";
import { redirect } from "next/navigation";

import AvatarUpload from "../Avatar/AvatarUpload";

export default async function MyInfo() {
  const result = await getMeAction();

  const user = result.user;

  if (!user) {
    redirect("/login");
  }

  const imageSrc = user?.profileImage
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${user.profileImage}`
    : null;

  return (
    <div className="flex items-center gap-6 py-6  px-4 border-t bg-white">
      <AvatarUpload
        imageSrc={imageSrc}
        fallbackText={user.nickName[0] ?? "U"}
        nickName={user.nickName}
      />
      <div>
        <p className="font-bold text-[18px]">{user?.nickName}</p>
        <p className="text-gray-600 text-[14px] ">{user?.email}</p>
      </div>
    </div>
  );
}
