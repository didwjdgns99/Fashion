type BuyProps = {
  onClick: () => void;
};

export default function Buy({ onClick }: BuyProps) {
  return (
    <>
      <div className="flex justify-center">
        <button
          className="text-white text-center bg-black w-[50%] py-2 rounded-md font-bold cursor-pointer"
          onClick={onClick}
        >
          구매하기
        </button>
      </div>
    </>
  );
}
