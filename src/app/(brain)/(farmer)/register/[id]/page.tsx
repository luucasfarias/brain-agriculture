
import { Farmer } from "@/data/types/farmer"
import NewForm from "../components/newform"

export default async function FarmerRegister() {
  await new Promise(resolve => setTimeout(resolve, 2000))

  const formData: any =
  {
    "name": "dasdas",
    "nameFarm": "dsdasdsadsa",
    "city": "dasdsad",
    "state": "CE",
    "totalFarmArea": "0",
    "totalArableArea": "0",
    "totalVegetationArea": "0",
    "crops": [
      {
        "label": "Café",
        "value": "coffee"
      },
      {
        "label": "Caféy",
        "value": "coffeey"
      },
      {
        "label": "Caféx",
        "value": "coffeex"
      }
    ],
    "id": 4
  }


  return (
    <div>
      <h2>Cadastro de agricultores</h2>

      <NewForm data={formData} />
      {/* <SeconFormFarmer data={formData} /> */}

      {/* <FormFarmer test="ola" /> */}
    </div>
  )
}
