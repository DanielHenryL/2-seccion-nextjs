'use client';
import { Button } from '@nextui-org/react'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function HomePage() {
  return (
    <>
      <Button color={'gradient'}>Hola mundo</Button>
    </>
  )
}