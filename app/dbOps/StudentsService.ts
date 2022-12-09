import {SupabaseClient} from '@supabase/supabase-js'
import {DBOps} from './DBOps'
import {SupaBaseConnector} from './SupabaseConnector'

export interface StudentQueryResponse {
  id: number
  name: string
  email: string
  birthday: string
  identifier?: number
  expiration?: string
}

export interface Student {
  name: string
  email: string
  birthday: string
  user_id: string
}

class StudentsDBConnector extends DBOps<StudentQueryResponse, Student> {
  async fetchByUser(user_id: string): Promise<StudentQueryResponse[]> {
    const {data} = await this.client.from('students_with_licenses').select('*').eq('user_id', user_id)

    return !!data ? data : []
  }
}

export const StudentsService = new StudentsDBConnector(SupaBaseConnector.client(), 'students')
