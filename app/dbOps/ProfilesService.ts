import {SupabaseClient} from '@supabase/supabase-js'
import {SupaBaseConnector} from './SupabaseConnector'

class ProfilesDBConnector {
  private client: SupabaseClient
  TABLE_NAME = 'profiles'

  constructor(dbConnector: SupabaseClient) {
    this.client = dbConnector
  }

  async fetchAll() {
    const {data} = await this.client.from(this.TABLE_NAME).select('*')

    return !!data ? data : []
  }

  async find(id: string) {
    return await this.client.from(this.TABLE_NAME).select('*').eq('id', id).single()
  }

  async create(identifier: number, expedition: string, owner: string) {
    await this.client.from(this.TABLE_NAME).insert({identifier, expedition, owner})
  }

  async delete(id: string) {
    await this.client.from(this.TABLE_NAME).delete().filter('id', 'eq', id)
  }

  async edit(id: string, identifier: number, expedition: string, owner: string) {
    await this.client.from(this.TABLE_NAME).update({identifier, expedition, owner}).eq('id', id)
  }
}

export const ProfilesService = new ProfilesDBConnector(SupaBaseConnector.client())
