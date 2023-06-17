import Head from 'next/head'
import React, { FC, PropsWithChildren } from 'react'
import { Navbar } from '../ui'

interface Props{
  children:JSX.Element,
  title?:string
}
const origin = ( typeof window === 'undefined') ? '':window.location.origin
export const Layout:FC<PropsWithChildren <Props>> = ({children, title}) => {
  return (
    <>
      <Head>
          <title>{title || 'PokemonApp'}</title>
          <meta name='author' content='Henry Daniel' />
          <meta name='descripcion' content={`Informacion de un pokemon ${title}`} />
          <meta name='keywords' content={`${title}, pokemon, pokedex `} />
          <meta property="og:title" content={`Informacion de un pokemon ${title}`} />
          <meta property="og:description" content={`Esta es la pagina sobre ${title}`} />
          <meta property="og:image" content={`${origin}/imgs/banner.png`} />
      </Head>
      <Navbar />

      <main style={{
        padding: '10px 30px'
      }}>
          {children}
      </main>
    </>
  )
}
