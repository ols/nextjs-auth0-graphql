import { initAuth0 } from '@auth0/nextjs-auth0';

export default initAuth0({
  clientId: process.env.AUTH0_CLIENT_ID == null ? '' : process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET == null ? '' : process.env.AUTH0_CLIENT_SECRET,
  scope: 'openid profile email',
  domain: process.env.AUTH0_DOMAIN == null ? '' : process.env.AUTH0_DOMAIN,
  redirectUri: process.env.AUTH0_REDIRECT_URL == null ? '' : process.env.AUTH0_REDIRECT_URL,
  postLogoutRedirectUri: process.env.POST_LOGOUT_REDIRECT_URI == null ? '' : process.env.POST_LOGOUT_REDIRECT_URI,
  session: {
    cookieSecret: process.env.SESSION_COOKIE_SECRET == null ? '' : process.env.SESSION_COOKIE_SECRET,
    cookieLifetime: 7200,
    storeIdToken: true,
    storeRefreshToken: false,
    storeAccessToken: false
  }
});
