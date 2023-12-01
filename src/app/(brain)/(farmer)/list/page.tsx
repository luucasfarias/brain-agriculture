import { TableFarmers } from "@/components/table"
import { Button, Flex, Heading } from "@radix-ui/themes"
import { UserPlus } from "lucide-react"

export default async function ListFarmers() {
  await new Promise(resolve => setTimeout(resolve, 2000))

  return (
    <div>
      <Flex direction="row" justify="between" align="center" className="mt-8">
        <Heading>
          Produtores cadastrados
        </Heading>

        <Button size="3" color="blue" className="cursor-pointer">
          <UserPlus />
          Adicionar novo produtor
        </Button>
      </Flex>

      <Flex direction="column" gap="3" style={{ maxWidth: 400 }}>
        <input type="text" name="search" id="" placeholder="Buscar" className="border-sky-100" />
      </Flex>

      <Flex direction="row" className="mt-4">
        <TableFarmers />
      </Flex>
    </div>
  )
}