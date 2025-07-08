import { MainHeader } from "@/widgets/header/main-header";

export function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center mx-auto">
      <MainHeader />
      {children}
    </div>
  );
}
