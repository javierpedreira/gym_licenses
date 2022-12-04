import {SupabaseClient} from '@supabase/supabase-js'
import {SupaBaseConnector} from './SupabaseConnector'

class StudentsDBConnector {
  private client: SupabaseClient

  constructor(dbConnector: SupabaseClient) {
    this.client = dbConnector
  }

  async fetchAllStudents() {
    const {data} = await this.client.from('students').select('*')

    return !!data ? data : []
  }

  async createStudent(name: string, email: string, birthday: string) {
    await this.client.from('students').insert({name, email, birthday})
  }

  async deleteStudent(id: string) {
    await this.client.from('students').delete().filter('id', 'eq', id)
  }

  async editStudent(id: string, name: string, email: string, birthday: string) {
    await this.client.from('students').update({name, email, birthday}).eq('id', id)
  }
}

export const StudentsService = new StudentsDBConnector(SupaBaseConnector.client())
