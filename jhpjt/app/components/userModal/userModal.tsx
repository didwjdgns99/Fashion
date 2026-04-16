import { ReactNode } from "react";

type UserModalPros = {
  children: ReactNode;
  onConfirm: () => void;
};

export default function UserModal({ children, onConfirm }: UserModalPros) {
  return (
    <div className="flex flex-col items-center gap-5 bg-white px-8 py-4 rounded-md">
      {children}
      <button
        onClick={onConfirm}
        className="bg-black text-white px-4 py-1 rounded-md cursor-pointer"
      >
        확인
      </button>
    </div>
  );
}
