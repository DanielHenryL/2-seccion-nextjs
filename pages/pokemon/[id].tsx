import { Layout } from "@/components/layouts"
import { GetStaticProps, GetStaticPaths } from "next"
import { useRouter } from "next/router"

interface Props{
  id:string,
  name:string
}

export default function PokemonPage({id, name}:Props) {
    const router = useRouter()
    console.log(router.query)
  return (
    <Layout title="hola mundo">
        <h1>{id} - {name}</h1>
    </Layout>
  )
}

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export const getStaticPaths: GetStaticPaths = async (ctx) => {
  

  return {
    paths: [
      {
        params: { id:'1' }
      },
      {
        params: { id:'2' }
      },
      {
        params: { id:'3' }
      }
    ],
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  // const {data} = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151')
  
  return {
    props: { 
      id:1,
      name:'Bulbasaur'
    } 
  }
}
