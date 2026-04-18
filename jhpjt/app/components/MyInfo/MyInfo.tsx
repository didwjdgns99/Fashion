import { getMeAction } from "@/app/actions/getMe.action";

import Avatar from "../Avatar/Avatar";

export default async function MyInfo() {
  const result = await getMeAction();

  const user = result.user;

  return (
    <div className="flex items-center gap-4 py-6  px-4 border-t mt-4 shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
      <Avatar
        src={user?.profileImage}
        className="text-white text-2xl font-bold"
        size="lg"
      />
      <div>
        <p className="font-bold text-[18px]">{user?.nickName}</p>
        <p className="text-gray-600 text-[14px] ">{user?.email}</p>
      </div>
    </div>
  );
}
