import {SupaBaseConnector} from './SupabaseConnector'
import {DBOps} from './DBOps'

export interface LicenseQueryResponse {
  id: string
  identifier: number
  owner: string
  expedition: string
  expiration: string
}

interface License {
  identifier: number
  expedition: string
  expiration: string
  owner: string
}

class LicenseDBConnector extends DBOps<LicenseQueryResponse, License> {
  async fetchByOwner(owner: string): Promise<LicenseQueryResponse[]> {
    const {data} = await this.client
      .from(this.TABLE_NAME)
      .select('*')
      .eq('owner', owner)
      .order('expiration', {ascending: false})

    return !!data ? data : []
  }
}

export const LicensesService = new LicenseDBConnector(SupaBaseConnector.client(), 'licenses')
