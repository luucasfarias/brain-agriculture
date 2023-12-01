export default async function Home() {
  await new Promise(resolve => setTimeout(resolve, 2000))

  return (
    <h2>Inicio meu teste</h2>
  )
}
