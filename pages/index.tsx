'use client';
import { GetStaticProps } from 'next';
import { Grid } from '@nextui-org/react';
import { pokeApi } from '@/api';
import { Layout } from '@/components/layouts';
import { PokemonListResponse, SmallPokemon } from '@/interface';
import { PokemonCard } from '@/components/pokemon';

 interface Props{
  pokemons:SmallPokemon[];
 }

export default function HomePage({pokemons}:Props) {
  console.log(pokemons)
  return (
    <Layout title={'Listado de pokemon'}>
      <Grid.Container gap={2} justify='flex-start'>
        {
          pokemons.map( ( poke) => (
            <PokemonCard key={poke.id} pokemon={poke}/>
          ))
        }
      </Grid.Container>
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