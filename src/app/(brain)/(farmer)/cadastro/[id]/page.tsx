import Form from "../../../../../components/form"

export const getFarmer = async (id: number) => {
  const response = await fetch(`http://localhost:3001/farmers/${id}`)
  return response.json()
}

export default async function CadastroEdit({ params }: { params: { id: number } }) {
  const farmer = await getFarmer(params.id)

  return (
    <div>
      <Form data={farmer} id={farmer.id} />
    </div>
  )
}
