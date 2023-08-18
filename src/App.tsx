
//React Imports
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//Auth0 Imports
import { withAuthenticationRequired } from '@auth0/auth0-react';
import { useAuth0 } from "@auth0/auth0-react";

//Native Imports
//Components
import { DashBoard } from './components/Dashboard/Dashboard';
import { RedirectToDashboard } from './components/Redirect/redirect';
import { AccountPage } from './components/AccountPage/AccountPage';
import { NavBar } from './components/NavBar/NavBar';
import { CallbackComponent } from './components/CallbackComponent/CallbackComponent';

export const App = () => {

  const ProtectedDashboard = withAuthenticationRequired(DashBoard);

  const { isLoading, error } = useAuth0();

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <div>...is Loading</div>;
  }

  return (
    <div>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/callback" element={<CallbackComponent />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/" element={<RedirectToDashboard />} />
          </Routes>
        </Router>
    </div>
  );
}
