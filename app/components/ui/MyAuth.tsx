import {SupabaseClient} from '@supabase/supabase-js'
import {useState} from 'react'

interface MyAuthProps {
  supabaseClient: SupabaseClient
}
export default function MyAuth({supabaseClient}: MyAuthProps) {
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const saveEmail = async () => {
    setEmailSent(!emailSent)

    await supabaseClient.auth.signInWithOtp({
      email
    })
  }
  return (
    <div>
      {!emailSent ? (
        <div className="text-center">
          <input
            className="px-4 py-2 mr-4 flex-auto rounded-lg"
            type="email"
            placeholder="Tu email"
            onChange={(e) => setEmail(e.target.value)}></input>
          <button
            className="mt-4 py-2 px-4 bg-neutral-500 rounded-lg font-bold text-zinc-200 hover:bg-neutral-400"
            type="submit"
            onClick={saveEmail}>
            Envía link de login
          </button>
        </div>
      ) : (
        <span>Un correo ha sido enviado con el enlace de login.</span>
      )}
    </div>
  )
}
