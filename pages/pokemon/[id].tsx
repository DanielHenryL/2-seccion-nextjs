import { pokeApi } from "@/api";
import { Layout } from "@/components/layouts"
import { Pokemon } from "@/interface";
import { Image } from "@nextui-org/react";
import { GetStaticProps, GetStaticPaths } from "next"

interface Props{
  pokemon:Pokemon;
}

export default function PokemonPage({pokemon}:Props) {
  return (
    <Layout title="hola mundo">
      <>
        <h1>{pokemon.name}</h1>
        <Image src={pokemon.sprites.other.dream_world.front_default} alt="pokemon img" width={150} height={150}/>
      </>
    </Layout>
  )
}

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const pokemons151 = [...Array(151)].map( (value, index ) => `${ index +1 }`);

  return {
    paths: pokemons151.map((id)=> ({
      params: { id }
    })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const {id} = params as { id:string};

  const {data} = await pokeApi.get<Pokemon>(`/pokemon/${id}`)
  
  return {
    props: { 
      pokemon: data
    } 
  }
}
