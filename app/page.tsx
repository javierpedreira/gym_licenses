'use client'

import {useSession, useSupabaseClient} from '@supabase/auth-helpers-react'
import StudentSummary from './components/students/StudentSummary'
import MyAuth from './components/ui/MyAuth'
import {useRouter} from 'next/navigation'

export default function Home() {
  const session = useSession()
  const supabase = useSupabaseClient()
  const router = useRouter()

  const logout = () => {
    supabase.auth.signOut()
    router.push('/')
  }

  return (
    <div>
      {!session ? (
        <MyAuth supabaseClient={supabase} />
      ) : (
        <div>
          <StudentSummary session={session} />
          <button className="fa-solid fa-right-from-bracket" onClick={logout}></button>
        </div>
      )}
    </div>
  )
}
