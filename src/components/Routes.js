import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const AuthedRoute = ({ component: Component, userInfo, ...rest }) => {
  if (userInfo === null) {
    return null;
  }

  const routeChecker = (taco) => (
    userInfo
      ? <Component
            {...taco}
            {...rest}
            userInfo={userInfo}
          />
      : <Redirect
          to={{
            pathname: '/',
            state: {
              from: taco.location
            }
          }}
        />
  );

  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

AuthedRoute.propTypes = {
  component: PropTypes.func,
  userInfo: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
};

const UnAuthedRoute = ({ component: Component, userInfo, ...rest }) => {
  if (userInfo === null) {
    return null;
  }

  const routeChecker = (taco) => (
    !userInfo
      ? <Component
            {...taco}
            {...rest}
            userInfo={userInfo}
          />
      : <Redirect
          to={{
            pathname: '/',
            state: {
              from: taco.location
            }
          }}
        />
  );

  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

UnAuthedRoute.propTypes = {
  component: PropTypes.func,
  userInfo: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
};

const AdminRoute = ({ component: Component, userInfo, ...rest }) => {
  if (userInfo === null) {
    return null;
  }

  const routeChecker = (taco) => (
    userInfo.isAdmin
      ? <Component
            {...taco}
            {...rest}
            userInfo={userInfo}
          />
      : <Redirect
          to={{
            pathname: '/',
            state: {
              from: taco.location
            }
          }}
        />);

  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

AdminRoute.propTypes = {
  component: PropTypes.func,
  userInfo: PropTypes.oneOfType([
    PropTypes.shape({
      isAdmin: PropTypes.bool,
    }),
    PropTypes.bool,
  ]),
};

const Routes = ({ userInfo }) => {
  console.warn(userInfo);
  return (
    <>
      <AdminRoute
        exact
        userInfo={userInfo}
        path="/admin"
        component={(props) => <> Is Admin {console.warn(props)}</>}
      />
      <AuthedRoute
        exact
        userInfo={userInfo}
        path="/authed"
        component={(props) => <> Authed {console.warn(props)}</>}
      />
      <UnAuthedRoute
        exact
        userInfo={userInfo}
        path="/unauthed"
        component={(props) => <> unauthed {console.warn(props)}</>}
      />
    </>
  );
};

Routes.propTypes = {
  userInfo: PropTypes.oneOfType([
    PropTypes.shape({
      isAdmin: PropTypes.bool,
    }),
    PropTypes.bool,
  ]),
};

export default Routes;
