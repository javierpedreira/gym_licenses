import {PostgrestError, PostgrestResponse, PostgrestSingleResponse, SupabaseClient} from '@supabase/supabase-js'
import {DBOps} from './DBOps'
import {SupaBaseConnector} from './SupabaseConnector'

interface ProfileQueryResponse {
  username: string | null
  website: string | null
  avatar_url: string | null
}

class ProfilesDBConnector extends DBOps<ProfileQueryResponse, ProfileQueryResponse> {}

export const ProfilesService = new ProfilesDBConnector(SupaBaseConnector.client(), 'profiles')
