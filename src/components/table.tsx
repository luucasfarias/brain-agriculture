'use client'
import EditButton from "@/components/edit-button"
import NewFarmerNavigate from "@/components/new-farmer-navigate"
import { useFarmer } from "@/contexts/farmer-context"
import { AlertDialog, Button, Flex, Table } from "@radix-ui/themes"
import { Trash2 } from "lucide-react"
import { useEffect } from "react"
import { toast } from "react-toastify"

export function TableFarmers() {
  const { farmers, updateFarmers } = useFarmer()

  const handleRemove = (id: number) => {
    removeProductor(id);
  }

  useEffect(() => {
    updateFarmers(farmers)
  }, [])

  async function removeProductor(id: number) {
    try {
      const response = await fetch(`http://localhost:3001/farmers/${id}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json'
        }
      })
      if (response.ok) {
        const updateList = farmers.filter(item => item.id !== id)

        updateFarmers(updateList)
        toast('Remoção realizada com sucesso!', { theme: 'light', type: 'success' })
      } else {
        toast('Ops! Algo deu errado com esta transação, tente novamente.', { theme: 'light', type: 'error' })
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="">
      <Flex justify="end" mb="4" gap="2">
        <NewFarmerNavigate />
      </Flex>

      <Table.Root size="2" className="max-h-80 overflow-auto">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell width={270}>Produtor</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell width={255}>Fazenda</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell justify="center">Ações</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {
            farmers.map((farm, index) => {
              return (
                <Table.Row key={farm.id + index}>
                  <Table.RowHeaderCell>{farm.name}</Table.RowHeaderCell>
                  <Table.Cell>{farm.nameFarm}</Table.Cell>
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