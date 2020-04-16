import React from 'react';
import {
  Switch,
  Route
} from "react-router-dom";
import AuthRoute from 'components/auth/AuthRoute';
import GuestRoute from 'components/auth/GuestRoute';
import ContractorHome from './pages/ContractorHome';
import NewApplication from './pages/NewApplication';
import Login from './pages/Login';
import ManageApplications from 'pages/ManageApplications';

const Routes = () => {
  return (
    <div className="container bwm-container">
      <Switch>
        <Route exact path="/">
          <ContractorHome />
        </Route>
        <AuthRoute path="/applications/manage">
          <ManageApplications />
        </AuthRoute>
        <AuthRoute path="/applications/new">
          <NewApplication />
        </AuthRoute>
        <GuestRoute path="/login">
          <Login />
        </GuestRoute>
        
      </Switch>
    </div>
  )
}

export default Routes;