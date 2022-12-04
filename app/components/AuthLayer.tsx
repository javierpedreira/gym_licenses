import {Auth, ThemeSupa} from '@supabase/auth-ui-react'
import {useSession, useSupabaseClient} from '@supabase/auth-helpers-react'
import {ReactElement} from 'react'

interface AuthLayerProps {
  children: React.ReactNode
}

export default function AuthLayer({children}: AuthLayerProps) {
  const session = useSession()
  const supabase = useSupabaseClient()

  return <>{!session ? <Auth supabaseClient={supabase} appearance={{theme: ThemeSupa}} theme="dark" /> : children}</>
}
