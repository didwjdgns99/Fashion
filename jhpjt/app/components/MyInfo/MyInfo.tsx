import { getMeAction } from "@/app/actions/getMe.action";

import AvatarUpload from "../Avatar/AvatarUpload";

export default async function MyInfo() {
  const result = await getMeAction();

  const user = result.user;

  const imageSrc = user?.profileImage
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${user.profileImage}`
    : null;

  return (
    <div className="flex items-center gap-6 py-6  px-4 border-t mt-4 shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
      <AvatarUpload imageSrc={imageSrc} fallbackText={user.nickName[0]} />
      <div>
        <p className="font-bold text-[18px]">{user?.nickName}</p>
        <p className="text-gray-600 text-[14px] ">{user?.email}</p>
      </div>
    </div>
  );
}
