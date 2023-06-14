import Head from 'next/head'
import React, { FC, PropsWithChildren } from 'react'
import { Navbar } from '../ui'

interface Props{
  children:JSX.Element,
  title?:string
}
export const Layout:FC<PropsWithChildren <Props>> = ({children, title}) => {
  return (
    <>
      <Head>
          <title>{title || 'PokemonApp'}</title>
          <meta name='author' content='Fernando Herrera' />
          <meta name='descripcion' content='Informacion de un pokemon XXXXXX' />
          <meta name='keywords' content={`${title}, pokemon, pokedex `} />
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
