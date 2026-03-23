import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input(props: InputProps) {
  return (
    <input
      className="w-full h-[56px] rounded-[16px] px-[24px] py-[17.5px] bg-[#E8F0FE]"
      {...props}
    />
  );
}
