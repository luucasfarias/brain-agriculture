import { Button, Flex, Table } from "@radix-ui/themes"

import { Trash2, Pencil } from "lucide-react"

export function TableFarmers() {
  return (
    <div>
      <Table.Root variant="surface" size="3">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell width={270}>Nome do produtor</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell width={255}>Nome da Fazenda</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Estado</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Área total em hectares da fazenda</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Área agricultável em hectares</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Área de vegetação em hectares</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Culturas</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell justify="center">Ação</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.RowHeaderCell>Danilo Sousa</Table.RowHeaderCell>
            <Table.Cell>danilo@example.com</Table.Cell>
            <Table.Cell>Developer</Table.Cell>
            <Table.RowHeaderCell>Danilo Sousa</Table.RowHeaderCell>
            <Table.Cell>danilo@example.com</Table.Cell>
            <Table.Cell>Developer</Table.Cell>
            <Table.Cell>Developer</Table.Cell>
            <Table.Cell>
              <Flex justify="between" gap="2">
                <Button color="grass">
                  <Pencil size="17" />
                </Button>
                <Button color="red">
                  <Trash2 size="17" />
                </Button>
              </Flex>
            </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.RowHeaderCell>Zahra Ambessa</Table.RowHeaderCell>
            <Table.Cell>zahra@example.com</Table.Cell>
            <Table.Cell>Admin</Table.Cell>
            <Table.RowHeaderCell>Danilo Sousa</Table.RowHeaderCell>
            <Table.Cell>danilo@example.com</Table.Cell>
            <Table.Cell>Developer</Table.Cell>
            <Table.Cell>Developer</Table.Cell>
            <Table.Cell>
              <Flex justify="between" gap="2">
                <Button color="grass">
                  <Pencil size="17" />
                </Button>
                <Button color="red">
                  <Trash2 size="17" />
                </Button>
              </Flex>
            </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.RowHeaderCell>Jasper Eriksson</Table.RowHeaderCell>
            <Table.Cell>jasper@example.com</Table.Cell>
            <Table.Cell>Developer</Table.Cell>
            <Table.RowHeaderCell>Danilo Sousa</Table.RowHeaderCell>
            <Table.Cell>danilo@example.com</Table.Cell>
            <Table.Cell>Developer</Table.Cell>
            <Table.Cell>Developer</Table.Cell>
            <Table.Cell>
              <Flex justify="between" gap="2">
                <Button color="grass">
                  <Pencil size="17" />
                </Button>
                <Button color="red">
                  <Trash2 size="17" />
                </Button>
              </Flex>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </div>
  )
}