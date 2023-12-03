import NewForm from "../../register/components/newform"

const getProdutor = async (id: number) => {
  const response = await fetch(`http://localhost:3001/farmers/${id}`)
  return response.json()
}

export default async function CadastroEdit({ params }: { params: { id: number } }) {
  // await new Promise(resolve => setTimeout(resolve, 2000))

  const productor = await getProdutor(params.id)

  return (
    <div>
      <h2>Meu cadastro edit</h2>

      <NewForm data={productor} id={productor.id} />
    </div>
  )
}
