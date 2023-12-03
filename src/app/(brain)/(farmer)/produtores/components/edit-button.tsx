'use client'

import { Button } from '@radix-ui/themes'
import { Pencil } from 'lucide-react'
import { useRouter } from 'next/navigation'

type EditProps = {
  id: number
}

export default function EditButton({ id }: EditProps) {
  const router = useRouter()

  const navigateToEditProductor = (id: number) => {
    console.log('aq', id);
    router.push(`/cadastro/${id}`)
  }

  return (
    <>
      <Button color="grass" onClick={() => navigateToEditProductor(id)}>
        <Pencil size="17" />
      </Button>
    </>
  )
}