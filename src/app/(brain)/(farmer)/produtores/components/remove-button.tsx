'use client'

import { Button } from '@radix-ui/themes'
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { MouseEvent } from 'react'

type EditProps = {
  id: number,
  handleClick: (e: MouseEvent<HTMLInputElement>) => void,
}

export default function RemoveButton({ id }: EditProps) {
  const router = useRouter()

  // const onRemove = async (id: number) => {
  //   console.log('aqui: ', id);
  //   try {
  //     const response = await fetch(`http://localhost:3001/farmers/${id}`, {
  //       method: 'DELETE',
  //       headers: {
  //         'content-type': 'application/json'
  //       }
  //     })
  //     if (response.ok) {
  //       console.log(response);
  //       // router.replace(router.asPath)
  //       console.log('Removido com sucesso');

  //     } else {
  //       console.log('Opps! some error occurred: ', response);
  //     }
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  const handleRemoveProductor = (id: number) => {
    console.log('aq', id);
    // router.push(`/cadastro/${id}`)

    // router.replace(router)
    // onRemove(id)
  }

  function handleClick(event?: MouseEvent<HTMLButtonElement, MouseEvent>): void {
    console.log('aqqqqq');

  }

  return (
    <>
      <Button color="red" onClick={() => handleClick}>
        <Trash2 size="17" />
      </Button>
    </>
  )
}