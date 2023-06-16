import { Layout } from "@/components/layouts"
import { FavoritePorkemons } from "@/components/pokemon"
import { NoFavorites } from "@/components/ui"
import { localFavorites } from "@/utils"
import { Card, Grid } from "@nextui-org/react"
import { useEffect, useState } from "react"

const FavoritesPage = () => {
  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([])

useEffect(() => {
  setFavoritePokemons( localFavorites.pokemons()  )
}, [])

  return (
    <Layout title="Pokemon Favoritos">
      {
        favoritePokemons.length === 0
        ? ( <NoFavorites />) 
        : ( <FavoritePorkemons pokemons={favoritePokemons}/> )
      }
    </Layout>
  )
}

export default FavoritesPage
