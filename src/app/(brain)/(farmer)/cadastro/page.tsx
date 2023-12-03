import NewForm from "../register/components/newform"

export default async function Cadastro() {
  // await new Promise(resolve => setTimeout(resolve, 2000))

  return (
    <div>
      <h2>Meu cadastro edit</h2>

      <NewForm />
    </div>
  )
}
