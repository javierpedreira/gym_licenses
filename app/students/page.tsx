import Students from './Students'
import {createClient, SupabaseClient} from '@supabase/supabase-js'
import {SupaBaseConnector} from '../utils/SupabaseConnector'
import {StudentsService} from '../utils/StudentsService'

export default async function StudentsPage() {
  const students = await StudentsService.fetchAllStudents()

  return <Students students={students} />
}
