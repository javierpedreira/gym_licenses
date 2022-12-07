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
}

class StudentsDBConnector extends DBOps<StudentQueryResponse, Student> {
  async fetchAll(): Promise<StudentQueryResponse[]> {
    const {data} = await this.client.from('students_with_licenses').select('*')

    return !!data ? data : []
  }
}

export const StudentsService = new StudentsDBConnector(SupaBaseConnector.client(), 'students')
