import { ReactNode } from "react";

type UserModalPros = {
  children: ReactNode;
  onConfirm: () => void;
  text: string;
  onConfirm2?: () => void;
  text2?: string;
};

export default function UserModal({
  children,
  onConfirm,
  text,
  onConfirm2,
  text2,
}: UserModalPros) {
  return (
    <div className="flex flex-col items-center gap-5 bg-white px-8 py-4 rounded-md">
      {children}
      <button
        onClick={onConfirm}
        className="bg-black text-white px-4 py-1 rounded-md cursor-pointer w-50"
      >
        {text}
      </button>
      {text2 && onConfirm2 && (
        <button
          onClick={onConfirm2}
          className="bg-black text-white px-4 py-1 rounded-md cursor-pointer w-50"
        >
          {text2}
        </button>
      )}
    </div>
  );
}
