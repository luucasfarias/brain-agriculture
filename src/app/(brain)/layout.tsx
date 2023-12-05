import { ReactNode } from 'react';
import { Header } from '@/components/header';
import { FarmerProvider } from "@/contexts/farmer-context";
import ToastContainerNotify from "@/components/toast-container";

export default function BrainLayout({ children }: { children: ReactNode }) {
  return (
    <FarmerProvider>
      <div className="mx-auto grid min-h-screen w-full max-w-[1600px] grid-rows-[min-content_max-content] gap-5 p-8">
        <Header />
        <ToastContainerNotify />
        {children}
      </div>
    </FarmerProvider>
  )
}