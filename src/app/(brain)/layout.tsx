import { Header } from "@/components/header";
import { FarmerProvider } from "@/contexts/farmer-context";
import { ReactNode } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function BrainLayout({ children }: { children: ReactNode }) {
  return (
    <FarmerProvider>
      <div className="mx-auto grid min-h-screen w-full max-w-[1600px] grid-rows-[min-content_max-content] gap-5 p-8">
        <Header />
        <ToastContainer
          position="top-right"
          autoClose={2500}
        />
        {children}
      </div>
    </FarmerProvider>
  )
}