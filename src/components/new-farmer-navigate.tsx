'use client'

import { Button } from "@radix-ui/themes";
import { UserPlus } from "lucide-react";
import { useRouter } from 'next/navigation'

export default function NewFarmerNavigate() {
  const router = useRouter()

  const handleNavigation = () => {
    router.push('/cadastro')
  }

  return (
    <div>
      <Button size="3" className="cursor-pointer bg-blue-500" onClick={() => handleNavigation()}>
        <UserPlus color="#fff" />
        Novo produtor
      </Button>
    </div>
  )
}