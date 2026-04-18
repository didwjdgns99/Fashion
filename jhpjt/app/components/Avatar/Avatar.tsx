import Image from "next/image";

type AvatarSize = "sm" | "md" | "lg";

type AvatarProps = {
  src?: string;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  className?: string;
};

const sizeStyle = {
  sm: "w-[28px] h-[28px] text-xs",
  md: "w-8 h-8 text-sm",
  lg: "w-16 h-16",
};

export default function Avatar({
  src,
  alt = "프로필 이미지",
  name,
  size = "md",
  className,
}: AvatarProps) {
  const fallbackText = name ? name.charAt(0).toUpperCase() : "U";

  return (
    <div
      className={`
  relative overflow-hidden rounded-full
  flex items-center justify-center
  bg-gray-800
  ${sizeStyle[size]}
  ${className}
`}
    >
      {src ? (
        <Image src={src} alt={alt} fill className="object-cover" sizes="56px" />
      ) : (
        <span className="mt-0.5">{fallbackText}</span>
      )}
    </div>
  );
}
