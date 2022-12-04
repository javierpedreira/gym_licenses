import {SupaBaseConnector} from './SupabaseConnector'
import {DBOps} from './DBOps'

export interface LicenseQueryResponse {
  id: string
  identifier: number
  owner: string
  expedition: string
}

interface License {
  identifier: number
  expedition: string
  owner: string
}
class LicenseDBConnector extends DBOps<LicenseQueryResponse, License> {}

export const LicensesService = new LicenseDBConnector(SupaBaseConnector.client(), 'licenses')
