import { IAuthConfig } from '@forge/sso-client'

const FORGE_ACCESS_AUTHORITY: string = 'https://forge-identity-qa.dev.spec.honeywell.com'
const FORGE_ACCESS_CLIENT_ID: string = 'asset-analyser-asset-analyser-ui-ef336e'
const FORGE_ACCESS_RESPONSE_TYPE: string= 'code'
const FORGE_ACCESS_SCOPE: string = 'openid offline forge.eom forge.access'

export const authConfig: IAuthConfig = {
authority: FORGE_ACCESS_AUTHORITY,
client_id: FORGE_ACCESS_CLIENT_ID,
response_type: FORGE_ACCESS_RESPONSE_TYPE,
scope: FORGE_ACCESS_SCOPE,
redirect_uri: `${window.location.origin}/callback`,
post_logout_redirect_uri: `${window.location.origin}/logout`,
automaticSilentRenew: true,
}