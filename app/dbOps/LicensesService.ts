import {StudentId} from '../licenses/CreateLicense'
import {SupabaseClient} from '@supabase/supabase-js'
import {SupaBaseConnector} from './SupabaseConnector'

class LicensesDBConnector {
  private client: SupabaseClient

  constructor(dbConnector: SupabaseClient) {
    this.client = dbConnector
  }

  async fetchAll() {
    const {data} = await this.client.from('licenses').select('*')

    return !!data ? data : []
  }

  async create(identifier: number, expedition: string, owner: string) {
    console.log({identifier, expedition, owner})
    await this.client.from('licenses').insert({identifier, expedition, owner})
  }

  async delete(id: string) {
    await this.client.from('licenses').delete().filter('id', 'eq', id)
  }

  async edit(id: string, identifier: number, expedition: string, owner: string) {
    await this.client.from('licenses').update({identifier, expedition, owner}).eq('id', id)
  }
}

export const LicensesService = new LicensesDBConnector(SupaBaseConnector.client())
