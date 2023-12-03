import { Farmer } from "@/data/types/farmer"
import { AnotherForm } from "./components/another"
import { SeconFormFarmer } from "./components/seconform"
import NewForm from "./components/newform"

export default async function FarmerRegister() {
  await new Promise(resolve => setTimeout(resolve, 2000))

  return (
    <div>
      <h2>Cadastro de agricultores</h2>

      <NewForm />
    </div>
  )
}
