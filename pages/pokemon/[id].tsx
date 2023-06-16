import { pokeApi } from "@/api";
import { Layout } from "@/components/layouts"
import { Pokemon } from "@/interface";
import { localFavorites } from "@/utils";
import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";
import { GetStaticProps, GetStaticPaths } from "next"
import { useState } from "react";

interface Props{
  pokemon:Pokemon;
}

export default function PokemonPage({pokemon}:Props) {
  const [isInFavorites, setIsInFavorites] = useState( localFavorites.isVerificated(pokemon.id) )

  const onToggleFavorite = () => {
    localFavorites.toggleFavorite( pokemon.id );
    setIsInFavorites( !isInFavorites )
  }
  
  
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
                {isInFavorites? 'Quitar de favoritos': 'Guardar en favoritos'}
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
