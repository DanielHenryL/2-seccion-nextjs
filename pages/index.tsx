'use client';
import { GetStaticProps } from 'next';
import { pokeApi } from '@/api';
import { Card, Grid, Row, Text } from '@nextui-org/react';
import { Layout } from '@/components/layouts';
import { PokemonListResponse, SmallPokemon } from '@/interface';

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
            <Grid xs={6} sm={3} md={2} xl={1} key={poke.id}>
              <Card isHoverable isPressable>
                <Card.Body css={{ p:1 }}>
                  <Card.Image 
                    src={poke.image}
                    width={"100%"}
                    height={140}
                  />
                  <Card.Footer>
                    <Row justify='space-between'>
                      <Text transform='capitalize'>{ poke.name }</Text>
                      <Text>#{ poke.id }</Text>
                    </Row>
                  </Card.Footer>
                </Card.Body>
              </Card>
            </Grid>
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