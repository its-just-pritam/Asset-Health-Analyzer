const { Issuer } = require('openid-client');
const issuer = new Issuer({
    issuer: "https://forge-identity-qa.dev.spec.honeywell.com/", 
    authorization_endpoint: "https://forge-identity-qa.dev.spec.honeywell.com/oauth2/auth" 
});

const client = new issuer.Client({ client_id: 'qa-1' /* the client id you retrieved when creating or getting an Application*/ });
const state = String(Math.random() * 10000000); 
localStorage['oauth_state'] = state;
const authorizationUrl = client.authorizationUrl({ redirect_uris: ['http://localhost:8080'], 
scope: 'openid forge.access', state: state }); // Direct the user to the authorization URL

console.log(authorizationUrl);
// location.href = authorizationUrl;

export { authorizationUrl };