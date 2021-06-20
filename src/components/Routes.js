import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

const Routes = () => (
  <>
    <Switch>
      <Route
        exact //
        path='/'
        component={() => <>Home</>}
      />
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
