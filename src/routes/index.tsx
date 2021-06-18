import React, { useState, useEffect } from 'react';
import App from '../App';
import { User, UserManager } from 'oidc-client';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Icon } from "@scuf/common";
 
export const userManager = new UserManager({
    authority: 'https://forge-access-qa.dev.spec.honeywell.com/',
    metadata: {
        issuer: "https://forge-identity-qa.dev.spec.honeywell.com/",
        authorization_endpoint: 'https://forge-identity-qa.dev.spec.honeywell.com/oauth2/auth',
        token_endpoint: 'https://forge-identity-qa.dev.spec.honeywell.com/oauth2/token',
        userinfo_endpoint: 'https://forge-identity-qa.dev.spec.honeywell.com/userinfo',
    },
    client_id: 'asset-analyser-asset-analyser-ui-ef336e', // Replace with a config value
    response_type: 'code',
    scope: 'openid offline forge.eom forge.access',
    redirect_uri: `${window.location.origin}/callback`,
    post_logout_redirect_uri: `${window.location.origin}/logout`,
    // if true, will automatically refresh the access token either with the silent login or refresh token
    // if false, you will need to make sure the access token isn't expired (`user.expired`)
    //    otherwise call `userManager.signinSilent()` to renew
    automaticSilentRenew: true,
});
 
function useUser(userManager: UserManager): [User | undefined, boolean] {
  const [user, setUser] = useState<User>();
  const [isLoading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    userManager
      .getUser()
      .then((u) => {
        if (u) {
          setUser(u);
        }
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
    const onUserLoaded = (user: User) => setUser(user);
    userManager.events.addUserLoaded(onUserLoaded);
    return () => userManager.events.removeUserLoaded(onUserLoaded);
  }, [userManager]);
  console.log(user);
  return [user, isLoading];
}
 
// : <P extends object>(WrappedComponent: React.ComponentType<P>) => React.SFC<P>
function makeAuthenticator<P extends object>({
  userManager,
  PlaceholderComponent = () => null,
  WrappedComponent,
}: {
  PlaceholderComponent?: React.ComponentType;
  WrappedComponent: React.ComponentType<P>;
  userManager: UserManager;
}) {
  return (props: P) => {
    const [user, loading] = useUser(userManager);
    const [loggingIn, setLoggingIn] = useState(false);
 
    if (!loading && !user && !loggingIn) {
      setLoggingIn(true);
      userManager.signinSilent().catch(() => userManager.signinRedirect());
    }
 
    if (user) {
      console.log(user);
      return <WrappedComponent {...props} />;
    }
 
    return <PlaceholderComponent />;
  };
}
 
// `makeAuthenticator` "protects" the App component by wrapping it in a component that validates that
// the user has logged in first. While the user is logging in, the `placeholderComponent` is displayed
const AppWithAuth = makeAuthenticator({
  userManager,
  PlaceholderComponent: () => <div style={{textAlign: 'center', paddingTop: '20em'}}>
    Logging In...
    <Icon name="refresh" size="xlarge" loading={true}/>
  </div>,
  WrappedComponent: App,
});
 
const AuthRoutes = () => {
  return (
    // Use whatever router you want
    <Router>
      <Switch>
        <Route
          path="/callback"
          render={(routeProps) => {
            console.log("Post Render");
            userManager
              .signinCallback()
              .then((user) => {
                // Navigate user to home page
                // TODO: figure out how to persist router state prior to login attempt
                //       and restore it here
                console.log(user);
                routeProps.history.push('/');
              })
              .catch((err) => {
                // TODO: show error to user and present option to try again
                console.log("SignIn Callback error caught!");
                console.error(err);
              });
 
            // This displays while `userManager.signinCallback()` is processing
            return <div style={{textAlign: 'center', paddingTop: '20em'}}>
              SignInCallback() is processing...
              <Icon name="refresh" size="xlarge" loading={true}/>
              </div>;
          }}
        />
        <Route
          path="/logout"
          render={(routeProps) => {
            userManager.signoutCallback();
 
            // This displays once the user has logged out
            return (
              <button onClick={() => routeProps.history.push('/')}>
                Login
              </button>
            );
          }}
        />
        <AppWithAuth />
      </Switch>
    </Router>
  );
};
 
export default AuthRoutes;