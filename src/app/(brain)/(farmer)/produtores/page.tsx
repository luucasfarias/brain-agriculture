import { Farmer } from "@/data/types/farmer"
import { Flex, Heading } from "@radix-ui/themes"
import { TableFarmers } from "@/components/table"
import AddNewProductorNavigation from "./components/new-productor"

const getFarmers = async (): Promise<Farmer[]> => {
  const response = await fetch('http://localhost:3001/farmers')
  return response.json()
}

export default async function Produtores() {
  // await new Promise(resolve => setTimeout(resolve, 2000))
  const farmersData = await getFarmers()

  return (
    <div>
      <Flex direction="row" justify="between" align="center" className="mt-8">
        <Heading>
          Produtores cadastrados
        </Heading>

        <AddNewProductorNavigation />
      </Flex>

      <Flex direction="column" gap="3" style={{ maxWidth: 400 }}>
        <input type="text" name="search" id="" placeholder="Buscar" className="border-sky-100" />
      </Flex>

      <Flex direction="row" className="mt-4">
        <TableFarmers data={farmersData} />
      </Flex>
    </div>
  )
}
