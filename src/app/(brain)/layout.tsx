import { Header } from "@/components/header";
import { ReactNode } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function BrainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto grid min-h-screen w-full max-w-[1600px] grid-rows-[min-content_max-content]">
      <Header />
      <ToastContainer
        position="top-right"
        autoClose={2500}
      />
      {children}
    </div>
  )
}