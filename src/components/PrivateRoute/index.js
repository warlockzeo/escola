import React, { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';

const isLogged = localStorage.getItem('user') ? true : false;

const PrivateRoute = ({ component, ...rest }) => {
  const isNivelOk =
    (rest.path.match(/dashboard/g) !== null) &
      (localStorage.getItem('userAccessLevel') >= 90) ||
    (rest.path.match(/aluno/g) !== null) &
      (localStorage.getItem('userAccessLevel') < 90)
      ? true
      : false;

  console.log(rest);
  return (
    <Fragment>
      <Route
        {...rest}
        render={props =>
          isLogged & isNivelOk ? (
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
    </Fragment>
  );
};

export default PrivateRoute;
