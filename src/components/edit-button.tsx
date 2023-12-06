'use client'

import { Button } from '@radix-ui/themes'
import { Pencil } from 'lucide-react'
import { useRouter } from 'next/navigation'

type EditProps = {
  id: number
}

export default function EditButton({ id }: EditProps) {
  const router = useRouter()

  const navigateToEditFarmer = (id: number) => {
    router.push(`/cadastro/${id}`)
  }

  return (
    <>
      <Button color="grass" onClick={() => navigateToEditFarmer(id)}>
        <Pencil size="17" />
      </Button>
    </>
  )
}