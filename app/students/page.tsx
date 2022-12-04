import Students from './Students'
import {createClient, SupabaseClient} from '@supabase/supabase-js'
import {SupaBaseConnector} from '../dbOps/SupabaseConnector'
import {StudentsService} from '../dbOps/StudentsService'

export default async function StudentsPage() {
  const students = await StudentsService.fetchAll()

  return <Students students={students} />
}
