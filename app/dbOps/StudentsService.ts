import {SupabaseClient} from '@supabase/supabase-js'
import {SupaBaseConnector} from './SupabaseConnector'

class StudentsDBConnector {
  private client: SupabaseClient

  constructor(dbConnector: SupabaseClient) {
    this.client = dbConnector
  }

  async fetchAll() {
    const {data} = await this.client.from('students').select('*')

    return !!data ? data : []
  }

  async create(name: string, email: string, birthday: string) {
    await this.client.from('students').insert({name, email, birthday})
  }

  async delete(id: string) {
    await this.client.from('students').delete().filter('id', 'eq', id)
  }

  async edit(id: string, name: string, email: string, birthday: string) {
    await this.client.from('students').update({name, email, birthday}).eq('id', id)
  }
}

export const StudentsService = new StudentsDBConnector(SupaBaseConnector.client())
