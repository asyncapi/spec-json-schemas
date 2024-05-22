describe('OAuth2', () => {
  require('./flows/authorizationCodeOAuthFlow/authorizationCodeOAuthFlow.js');
  require('./flows/clientCredentialsOAuthFlow/clientCredentialsOAuthFlow.js');
  require('./flows/implicitOAuthFlow/implicitOAuthFlow.js');
  require('./flows/passwordOAuthFlow/passwordOAuthFlow.js');
  require('./flows/oauthFlows.js');
});
