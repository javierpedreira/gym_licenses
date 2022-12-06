'use client'

import {Auth, ThemeSupa} from '@supabase/auth-ui-react'
import {useSession, useSupabaseClient} from '@supabase/auth-helpers-react'
import StudentSummary from './components/students/StudentSummary'

export default function Home() {
  const session = useSession()
  const supabase = useSupabaseClient()

  console.log(session)

  return (
    <div>
      {!session ? (
        <Auth supabaseClient={supabase} appearance={{theme: ThemeSupa}} theme="dark" />
      ) : (
        <div>
          {/* <Account session={session} /> */}
          <StudentSummary session={session} />
        </div>
      )}
    </div>
  )
}
