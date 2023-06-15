import { Layout } from "@/components/layouts"
import { useRouter } from "next/router"

const PokemonPage = () => {
    const router = useRouter()
    console.log(router.query)
  return (
    <Layout title="hola mundo">
        <h1>Hola mundo</h1>
    </Layout>
  )
}
export default PokemonPage
