import React, { FC } from 'react';
import {
  Redirect, Route, Switch,
} from 'react-router-dom';

import { useAuth } from 'src/contexts/AuthContext';
import App from 'src/App';
import AdminLayout from 'src/layouts/Admin';
import { isEmpty } from 'lodash';
import PageNotFound from '../pages/404';
import PrivateRoute from './PrivateRoute';
import Login from '../pages/Login';
import Routes from './Routes';

const AppRouter: FC = () => {
  const { currUser } = useAuth();

  return (
    <div className="App">
      {/* <Navbar /> */}
      <Switch>
        <Route
          exact
          path={Routes.root}
          component={App}
        />
        <Route
          exact
          path={Routes.login}
          render={() => (!isEmpty(currUser)
            ? (
              <Redirect to={{ pathname: Routes.admin }} />
            ) : <Login />)}
        />
        <PrivateRoute
          path="/admin"
          component={AdminLayout}
        />

        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
};

export default AppRouter;
