'use client'
import {createBrowserSupabaseClient} from '@supabase/auth-helpers-nextjs'
import {SessionContextProvider, Session} from '@supabase/auth-helpers-react'
import {AppProps} from 'next/app'
import {useState} from 'react'

export default function RootLayout({children}: {children: React.ReactNode}) {
  const [supabase] = useState(() => createBrowserSupabaseClient())

  return (
    <html>
      <head />
      <body>
        <SessionContextProvider supabaseClient={supabase}>{children}</SessionContextProvider>
      </body>
    </html>
  )
}
