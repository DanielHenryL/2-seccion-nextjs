'use client';
import { pokeApi } from '@/api';
import { Layout } from '@/components/layouts';
import { PokemonListResponse, SmallPokemon } from '@/interface';
import { GetStaticProps } from 'next';

 interface Props{
  pokemons:SmallPokemon[];
 }

export default function HomePage({pokemons}:Props) {
  console.log(pokemons)
  return (
    <Layout title={'Listado de pokemon'}>
      <ul>
        {
          pokemons.map( ( poke) => (
            <div key={poke.id}>
              <li>{poke.id} - {poke.name}</li>
              <img src={poke.image} alt="Imagen pokemon" width={150} height={150}/>
            </div>
          ))
        }
      </ul>
    </Layout>
  )
}
export const getStaticProps: GetStaticProps = async (ctx) => {
    const {data} = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151')
    const pokemons:SmallPokemon[] = data.results.map((poke, i) => ({
      ...poke,
      id: i+1,
      image:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ i+1 }.svg`
    }))
    // "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
    return {
      props: { 
        pokemons
      } 
    }
  }