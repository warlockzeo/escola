import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const isLogged = localStorage.getItem('user') ? true : false;

const PrivateRoute = ({ component, ...rest }) => {
  return (
    <>
      <Route
        {...rest}
        render={props =>
          isLogged ? (
            React.createElement(component, props)
          ) : (
            <Redirect
              to={{
                pathname: '/login'
              }}
            />
          )
        }
      />
      ;
    </>
  );
};

export default PrivateRoute;
