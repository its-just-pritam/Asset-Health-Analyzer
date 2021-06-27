// import { displayToast, ToastLevel } from '@forge/common-portal-utils'
import {
  CallbackComponent,
  LoggedOutComponent,
  LoginComponent,
  useSSOClient,
} from "@forge/sso-client";
import { Loader } from "@scuf/common";
import { observer } from "mobx-react";
import React, { FC } from "react";
import { Redirect, Route, RouteProps, useHistory } from "react-router-dom";
import stores from "../Store";
export const LogoutRoute: FC<RouteProps> = ({ children, ...rest }) => (
  <Route
    {...rest}
    render={() => (
      <LoggedOutComponent autoRenew={true} loadingComponent={Loader} />
    )}
  />
);
export const LoginRoute: FC<RouteProps> = ({ children, ...rest }) => (
  <Route
    {...rest}
    render={() => <LoginComponent loadingComponent={Loader} />}
  />
);
export const CallbackRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const history = useHistory();
  const navToProjects = () => {
    history.push("/");
  };
  return (
    <Route
      {...rest}
      render={() => (
        <CallbackComponent
          onCallback={navToProjects}
          loadingComponent={Loader}
        />
      )}
    />
  );
};
export const PrivateRoute: FC<RouteProps> = observer(
  ({ children, ...rest }) => {
    const { user } = useSSOClient();
    const { globalStore } = stores;
    return (
      <Route
        {...rest}
        render={() =>
          user ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
              }}
            />
          )
        }
      />
    );
  }
);
