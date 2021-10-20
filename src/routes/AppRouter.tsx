import React, { FC } from 'react';
import {
  Redirect, Route, Switch,
} from 'react-router-dom';

import { useAuth } from 'src/contexts/AuthContext';
import AdminLayout from 'src/layouts/Admin';
import { isEmpty } from 'lodash';
import FormApp from 'src/FormApp';
import styled from '@emotion/styled';
import NotAvailable from 'src/pages/NotAvailable';
import Loading from 'src/components/Loading';
import PageNotFound from '../pages/404';
import PrivateRoute from './PrivateRoute';
import Login from '../pages/Login';
import Routes from './Routes';

const StyledContainer = styled.div``;

const AppRouter: FC = () => {
  const { currUser, isAppOn, fetching } = useAuth();

  const renderApp = () => {
    if (fetching) {
      return <Loading />;
    }
    return isAppOn ? <FormApp /> : <NotAvailable />;
  };

  return (
    <StyledContainer className="App">
      <Switch>
        <Route
          exact
          path={Routes.root}
          render={renderApp}
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
    </StyledContainer>
  );
};

export default AppRouter;
