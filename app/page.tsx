'use client'

import {useSession, useSupabaseClient} from '@supabase/auth-helpers-react'
import StudentSummary from './components/students/StudentSummary'
import MyAuth from './components/ui/MyAuth'

export default function Home() {
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <div>
      {!session ? (
        <div className="bg-slate-200 w-1/6 rounded-lg mx-auto mt-20 p-5">
          <MyAuth supabaseClient={supabase} />
        </div>
      ) : (
        <div>
          {/* <Account session={session} /> */}
          <StudentSummary session={session} />
        </div>
      )}
    </div>
  )
}
