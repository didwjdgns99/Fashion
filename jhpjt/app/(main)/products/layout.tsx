import { ReactNode } from "react";

export default function Layout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <>
      <div className="fixed top-2 left-2 z-[9999] text-white px-3 py-1"></div>
      {children}
      {modal}
    </>
  );
}
