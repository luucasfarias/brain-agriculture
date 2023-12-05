'use client'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ToastContainerNotify() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2500}
      />
    </>
  )
}
