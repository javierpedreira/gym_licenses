'use client'

import {Auth, ThemeSupa} from '@supabase/auth-ui-react'
import {useSession, useSupabaseClient} from '@supabase/auth-helpers-react'
import Account from './components/Account'
import CreateStudent from './components/students/CreateStudent'
import StudentSummary from './components/students/StudentSummary'

export default function Home() {
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <div className="container" style={{padding: '50px 0 100px 0'}}>
      {!session ? (
        <Auth supabaseClient={supabase} appearance={{theme: ThemeSupa}} theme="dark" />
      ) : (
        <>
          <Account session={session} />
          <StudentSummary session={session} />
          <CreateStudent />
        </>
      )}
    </div>
  )
}
