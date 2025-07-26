import { MainHeader } from "@/widgets/header/main-header";
import { Suspense } from "react";

export function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center mx-auto">
      <Suspense fallback={<div>Loading...</div>}>
        <MainHeader />
      </Suspense>

      {children}
    </div>
  );
}
