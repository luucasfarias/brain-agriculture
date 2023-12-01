import { Header } from "@/components/header";
import { ReactNode } from "react";

export default function BrainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto grid min-h-screen w-full max-w-[1600px] grid-rows-[min-content_max-content]">
      <Header />
      {children}
    </div>
  )
}