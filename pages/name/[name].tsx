import { Layout } from "@/components/layouts"
import { Pokemon, PokemonListResponse } from "@/interface";
import { localFavorites } from "@/utils";
import conffeti from 'canvas-confetti'
import { Button, Card, Container, Grid, Text,Image } from "@nextui-org/react"
import { useEffect, useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { pokeApi } from "@/api";
import { getPokemonInfo } from "@/utils/getPokemonInfo";
interface Props{
    pokemon:Pokemon;
  }
export default function PokemonByNamePage({pokemon}:Props)  {
    const [isInFavorites, setIsInFavorites] = useState( false )

  const onToggleFavorite = () => {
    localFavorites.toggleFavorite( pokemon.id );
    setIsInFavorites( !isInFavorites )

    if(!isInFavorites) {
      conffeti({
        zIndex:999,
        particleCount:150,
        spread:170,
        startVelocity:30,
        ticks:200,
        angle:-180,
        origin:{
          x:1,
          y:0,
        }
      })
    }
  }
  useEffect(() => {
    setIsInFavorites(localFavorites.isVerificated( pokemon.id ))
  }, [])
  
  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{ marginTop:'5px'}} gap={2}>
        <Grid xs={12} sm={4}>
          <Card isHoverable css={{ padding:'30px'}} > 
            <Card.Body>
              <Card.Image 
                src={ pokemon.sprites.other?.dream_world.front_default || '/no-image.png' }
                alt={ pokemon.name }
                width={'100%'}
                height={ 200 }
              />
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header css={{ display: 'flex', justifyContent:'space-between' }}>
              <Text h2 transform="capitalize">{pokemon.name}</Text>
              <Button
                color={'gradient'}
                ghost
                onPress={onToggleFavorite}
              >
                { isInFavorites ? 'Quitar de favoritos': 'Guardar en favoritos'}
              </Button>
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites:</Text>
              <Container display="flex" direction="row" gap={0} >
                <Image
                  src={ pokemon.sprites.front_default }
                  alt={ pokemon.name }
                  width={ 100 }
                  height={ 100 }
                />
                <Image
                  src={ pokemon.sprites.back_default }
                  alt={ pokemon.name }
                  width={ 100 }
                  height={ 100}
                />
                <Image
                  src={ pokemon.sprites.front_shiny}
                  alt={ pokemon.name }
                  width={ 100 }
                  height={ 100 }
                />
                <Image
                  src={ pokemon.sprites.back_shiny }
                  alt={ pokemon.name }
                  width={ 100 }
                  height={ 100 }
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  )
}
export const getStaticPaths: GetStaticPaths = async (ctx) => {
    const {data} = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');
    const pokemonNames:string[] = data.results.map( pokemon => pokemon.name )
    return {
      paths: pokemonNames.map(( name )=> ({
        params: { name }
      })),
      fallback: 'blocking'
    }
  }
  
  export const getStaticProps: GetStaticProps = async ({params}) => {
    const {name} = params as { name:string};
  
    const pokemon = await getPokemonInfo( name )

    if( !pokemon ){
        return {
            redirect:{
                destination:'/',
                permanent:false
            }
        }
    }
    return {
      props: { 
        pokemon
      },
      revalidate:86400
    }
  }

  