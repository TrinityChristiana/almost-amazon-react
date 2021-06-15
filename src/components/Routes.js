import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

const AuthedRoute = ({ component: Component, userInfo, ...rest }) => {
  if (userInfo === null) {
    return null;
  }

  // prettier-ignore
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
  userInfo: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const UnAuthedRoute = ({ component: Component, userInfo, ...rest }) => {
  if (userInfo === null) {
    return null;
  }

  // prettier-ignore
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
  userInfo: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const NormalRoute = ({ component: Component, userInfo, ...rest }) => {
  if (userInfo === null) {
    return null;
  }

  const routeChecker = (taco) => <Component {...taco} {...rest} userInfo={userInfo} />;

  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

NormalRoute.propTypes = {
  component: PropTypes.func,
  userInfo: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const AdminRoute = ({ component: Component, userInfo, ...rest }) => {
  if (userInfo === null) {
    return null;
  }

  // prettier-ignore
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

const Routes = ({ userInfo }) => (
  <>
    <Switch>
      <NormalRoute
        exact //
        userInfo={userInfo}
        path='/'
        component={() => <>Home</>}
      />
      <AdminRoute
        exact //
        userInfo={userInfo}
        path='/admin'
        component={() => <> Admin</>}
      />
      <AuthedRoute
        exact //
        userInfo={userInfo}
        path='/authed'
        component={() => <> Authed</>}
      />
      <UnAuthedRoute
        exact //
        userInfo={userInfo}
        path='/unauthed'
        component={() => <> UnAuthed</>}
      />
      {/* Author Routes */}
      {/* <AdminRoute
        exact //
        userInfo={userInfo}
        path='/authors/create'
        component={() => <> Authed</>}
      /> */}
      {/* <AdminRoute
        exact //
        userInfo={userInfo}
        path='/authors/edit/:authorId'
        component={() => <> Authed</>}
      /> */}
      {/* <NormalRoute
        exact //
        userInfo={userInfo}
        path='/authors'
        component={() => <> Authed</>}
      /> */}
      {/* <NormalRoute
        exact //
        userInfo={userInfo}
        path='/authors/:authorId'
        component={() => <> Authed</>}
      /> */}
      {/* Book Routes */}
      {/* <NormalRoute
        exact //
        userInfo={userInfo}
        path='/books'
        component={() => <> Authed</>}
      /> */}
      {/* <NormalRoute
        exact //
        userInfo={userInfo}
        path='/books/:bookId'
        component={() => <> Authed</>}
      /> */}
      {/* Favorites Routes */}
      {/* <AuthedRoute
        exact //
        userInfo={userInfo}
        path='/favorites'
        component={() => <> Authed</>}
      /> */}
      {/* <AuthedRoute
        exact //
        userInfo={userInfo}
        path='/favorites/authors'
        component={() => <> Authed</>}
      /> */}
      {/* <AuthedRoute
        exact //
        userInfo={userInfo}
        path='/favorites/books'
        component={() => <> Authed</>}
      /> */}
      {/* Notes Routes */}
      {/* <AuthedRoute
        exact //
        userInfo={userInfo}
        path='/notes'
        component={() => <> Authed</>}
      /> */}
      {/* User Routes */}
      {/* <AdminRoute
        exact //
        userInfo={userInfo}
        path='/users'
        component={() => <> Update User Types </>}
      /> */}
      <Redirect to='/' />
    </Switch>
  </>
);

Routes.propTypes = {
  userInfo: PropTypes.oneOfType([
    PropTypes.shape({
      isAdmin: PropTypes.bool,
    }),
    PropTypes.bool,
  ]),
};

export default Routes;
