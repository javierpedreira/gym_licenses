'use client'
import {createBrowserSupabaseClient} from '@supabase/auth-helpers-nextjs'
import {SessionContextProvider, Session} from '@supabase/auth-helpers-react'
import {useState} from 'react'
import Link from 'next/link'

import './globals.css'

export default function RootLayout({children}: {children: React.ReactNode}) {
  const [supabase] = useState(() => createBrowserSupabaseClient())

  return (
    <html>
      <head />
      <body className="bg-white">
        <header className="bg-black py-7 px-8 text-white font-bold">
          <Link href={`/`}>TKD</Link>
        </header>
        <main className="container mx-auto">
          <SessionContextProvider supabaseClient={supabase}>{children}</SessionContextProvider>
        </main>
      </body>
    </html>
  )
}
