import {SupabaseClient} from '@supabase/supabase-js'
import {SupaBaseConnector} from './SupabaseConnector'

class StudentsDBConnector {
  private client: SupabaseClient

  constructor(dbConnector: SupabaseClient) {
    this.client = dbConnector
  }

  async fetchAllStudents() {
    const {error, data, status} = await this.client.from('students').select('*')

    return !!data ? data : []
  }
}

export const StudentsService = new StudentsDBConnector(SupaBaseConnector.client())
