import Image from "next/image";

type AvatarSize = "sm" | "md" | "lg";

type AvatarProps = {
  src?: string;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  className?: string;
  fallback?: string;
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
        <Image
          src={src}
          alt={alt}
          unoptimized // Next.js의 Image 컴포넌트는 기본적으로 최적화를 수행하지만, 외부 URL을 사용할 때는 unoptimized 속성을 추가하여 최적화를 비활성화할 수 있습니다. 어떻게 진행되는지 질문
          fill
          className="object-cover"
          sizes="56px"
        />
      ) : (
        <span className="mt-0.5">{fallbackText}</span>
      )}
    </div>
  );
}
