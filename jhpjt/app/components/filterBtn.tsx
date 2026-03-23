type FilterBtnProps = {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
};

export default function FilterBtn({
  label,
  isActive = false,
  onClick,
}: FilterBtnProps) {
  return (
    <div className=" text-white mt-2 cursor-pointer">
      <button
        type="button"
        onClick={onClick}
        className={`px-4 py-2 text-[12px] rounded-xl border transition ${
          isActive
            ? "bg-gray-900 text-white border-gray-900"
            : "bg-white text-gray-700 border-gray-300"
        }`}
      >
        {label}
      </button>
    </div>
  );
}
