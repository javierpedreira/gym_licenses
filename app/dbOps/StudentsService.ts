import {SupabaseClient} from '@supabase/supabase-js'
import {DBOps} from './DBOps'
import {SupaBaseConnector} from './SupabaseConnector'

export interface StudentQueryResponse {
  id: number
  name: string
  email: string
  birthday: string
}

export interface Student {
  name: string
  email: string
  birthday: string
}

class StudentsDBConnector extends DBOps<StudentQueryResponse, Student> {}

export const StudentsService = new StudentsDBConnector(SupaBaseConnector.client(), 'students')
