'use client'
import {createBrowserSupabaseClient} from '@supabase/auth-helpers-nextjs'
import {SessionContextProvider, useSession} from '@supabase/auth-helpers-react'
import {useState} from 'react'
import Link from 'next/link'

import './globals.css'
import {useRouter} from 'next/navigation'

export default function RootLayout({children}: {children: React.ReactNode}) {
  const [supabase] = useState(() => createBrowserSupabaseClient())
  const router = useRouter()

  const logout = () => {
    supabase.auth.signOut()
    router.push('/')
  }

  return (
    <html>
      <head />
      <SessionContextProvider supabaseClient={supabase}>
        <body className="bg-white">
          <header className="bg-black py-7 px-8 text-white font-bold flex">
            <Link className="flex-1" href={`/`}>
              TKD
            </Link>
            {!!supabase.auth.getSession() && (
              <button className="button block" onClick={logout}>
                Sign Out
              </button>
            )}
          </header>
          <main className="container mx-auto">{children}</main>
        </body>
      </SessionContextProvider>
    </html>
  )
}
