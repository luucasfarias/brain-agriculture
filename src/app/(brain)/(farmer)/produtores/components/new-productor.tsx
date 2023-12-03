'use client'

import { Button } from "@radix-ui/themes";
import { UserPlus } from "lucide-react";
import { useRouter } from 'next/navigation'

export default function AddNewProductorNavigation() {
  const router = useRouter()

  const handleNavigation = () => {
    router.push('/cadastro')
  }

  return (
    <div>
      <Button size="3" color="blue" className="cursor-pointer" onClick={() => handleNavigation()}>
        <UserPlus />
        Adicionar novo produtor
      </Button>
    </div>
  )
}