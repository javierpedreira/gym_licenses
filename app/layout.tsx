'use client'
import {createBrowserSupabaseClient} from '@supabase/auth-helpers-nextjs'
import {SessionContextProvider, useSession} from '@supabase/auth-helpers-react'
import {useState} from 'react'
import Link from 'next/link'

import './globals.css'

export default function RootLayout({children}: {children: React.ReactNode}) {
  const [supabase] = useState(() => createBrowserSupabaseClient())

  return (
    <html>
      <head>
        <script src="https://kit.fontawesome.com/425ccf5841.js" crossOrigin="anonymous"></script>
      </head>
      <SessionContextProvider supabaseClient={supabase}>
        <body className="bg-white">
          <header className="bg-black py-7 px-8 text-white font-bold flex">
            <Link className="flex-1" href={`/`}>
              TKD
            </Link>
          </header>
          <main className="container mx-auto">{children}</main>
        </body>
      </SessionContextProvider>
    </html>
  )
}
