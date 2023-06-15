'use client';
import { pokeApi } from '@/api';
import { Layout } from '@/components/layouts';
import { GetStaticProps } from 'next';
import { Inter } from 'next/font/google'


// import type { InferGetStaticPropsType, GetStaticProps } from 'next'
// type Repo = {
//   name: string
//   stargazers_count: number
// }
 

export default function HomePage(props) {
  console.log({props})
  return (
    <Layout title={'Listado de pokemon'}>
      <ul>
        <li>Pokémon</li>
        <li>Pokémon</li>
        <li>Pokémon</li>
        <li>Pokémon</li>
        <li>Pokémon</li>
        <li>Pokémon</li>
        <li>Pokémon</li>
        <li>Pokémon</li>
        <li>Pokémon</li>
        <li>Pokémon</li>
       
      </ul>
    </Layout>
  )
}
export const getStaticProps: GetStaticProps = async (ctx) => {
    const {data} = await pokeApi.get('/pokemon?limit=151')
    
    return {
      props: { 
        pokemons:data.results
      } 
    }
  }