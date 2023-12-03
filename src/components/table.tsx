'use client'
import EditButton from "@/app/(brain)/(farmer)/produtores/components/edit-button"
import RemoveButton from "@/app/(brain)/(farmer)/produtores/components/remove-button"
import { Farmer } from "@/data/types/farmer"
import { AlertDialog, Button, Flex, Table } from "@radix-ui/themes"

import { Trash2, Pencil } from "lucide-react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

interface TableFarmerProps {
  data: Farmer[],
  onAction?: (id: number) => void,
}

export function TableFarmers({ data }: TableFarmerProps) {
  // const { push } = useRouter()
  const [list, setList] = useState<Farmer[]>(data)

  const handleClick = (id: number) => {
    console.log(id);

    // removeProductor(id)
  }

  const handleRemove = (id: number) => {
    removeProductor(id);
  }

  async function removeProductor(id: number) {
    console.log('remove produtor', id);
    try {
      const response = await fetch(`http://localhost:3001/farmers/${id}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json'
        }
      })
      if (response.ok) {
        const updateList = list.filter(item => item.id !== id)
        setList(updateList)

        toast('Remoção realizada com sucesso!', { theme: 'light', type: 'success' })
      } else {
        toast('Ops! Algo deu errado com esta transação, tente novamente.', { theme: 'light', type: 'error' })
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    setList(data)
  }, [])

  return (
    <div className="">
      <Table.Root variant="surface" size="2">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell width={270}>Nome do produtor</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell width={255}>Nome da Fazenda</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>CPF ou CNPJ</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Cidade</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Estado</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Área total fazenda</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Área agricultável</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Área de vegetação</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell justify="center">Ações</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {
            list.map((farm, index) => {
              return (
                <Table.Row key={farm.id + index}>
                  <Table.RowHeaderCell>{farm.name}</Table.RowHeaderCell>
                  <Table.Cell>{farm.nameFarm}</Table.Cell>
                  <Table.Cell>{farm.cpf_cnpj}</Table.Cell>
                  <Table.Cell>{farm.city}</Table.Cell>
                  <Table.Cell>{farm.state}</Table.Cell>
                  <Table.Cell>{farm.totalFarmArea}</Table.Cell>
                  <Table.Cell>{farm.totalArableArea}</Table.Cell>
                  <Table.Cell>{farm.totalVegetationArea}</Table.Cell>
                  <Table.Cell>
                    <Flex justify="between" gap="2">
                      <EditButton id={farm.id} />
                      <AlertDialog.Root>
                        <AlertDialog.Trigger>
                          <Button type="button" color="red">
                            <Trash2 size="17" />
                          </Button>
                        </AlertDialog.Trigger>

                        <AlertDialog.Content style={{ maxWidth: 450 }}>
                          <AlertDialog.Title>Remover produtor(a)</AlertDialog.Title>
                          <AlertDialog.Description size="2">
                            Deseja remover {farm.name}?
                          </AlertDialog.Description>

                          <Flex gap="3" mt="4" justify="end">
                            <AlertDialog.Cancel>
                              <Button variant="soft" color="gray">
                                Cancelar
                              </Button>
                            </AlertDialog.Cancel>
                            <AlertDialog.Action>
                              <Button variant="solid" color="red" onClick={() => handleRemove(farm.id)}>
                                Remover
                              </Button>
                            </AlertDialog.Action>
                          </Flex>
                        </AlertDialog.Content>
                      </AlertDialog.Root>
                      {/* <RemoveButton id={farm.id} handleClick={() => handleClick} /> */}
                    </Flex>
                  </Table.Cell>
                </Table.Row>
              )
            })
          }
        </Table.Body>
      </Table.Root>
    </div>
  )
}