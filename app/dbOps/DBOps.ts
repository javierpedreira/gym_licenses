import {PostgrestError, PostgrestResponse, PostgrestSingleResponse, SupabaseClient} from '@supabase/supabase-js'

export class DBOps<T, Y> {
  private client: SupabaseClient
  protected TABLE_NAME: string

  constructor(dbConnector: SupabaseClient, tableName: string) {
    this.client = dbConnector
    this.TABLE_NAME = tableName
  }

  async fetchAll(): Promise<T[]> {
    const {data} = await this.client.from(this.TABLE_NAME).select('*')

    return !!data ? data : []
  }

  async find(id: string): Promise<PostgrestSingleResponse<Y>> {
    return await this.client.from(this.TABLE_NAME).select('*').eq('id', id).single()
  }

  async create(payload: Y): Promise<PostgrestError | null> {
    const {error} = await this.client.from(this.TABLE_NAME).insert(payload)

    return error
  }

  async delete(id: any): Promise<PostgrestResponse<void>> {
    return this.client.from(this.TABLE_NAME).delete().filter('id', 'eq', id)
  }

  async edit(id: any, payload: Y): Promise<PostgrestError | null> {
    console.log('AAAAAAAAAAAA', payload)

    const {error} = await this.client
      .from(this.TABLE_NAME)
      .update({...payload, updated_at: new Date().toISOString()})
      .eq('id', id)

    return error
  }
}
