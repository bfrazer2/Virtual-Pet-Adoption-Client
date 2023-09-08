
//React Imports
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//Auth0 Imports
import { useAuth0 } from "@auth0/auth0-react";

//Native Imports
//Components
import { DashBoard } from './components/Dashboard/Dashboard';
import { AccountPage } from './components/AccountPage/AccountPage';
import { NavBar } from './components/NavBar/NavBar';
import { CallbackComponent } from './components/CallbackComponent/CallbackComponent';

//Context
import { PetProvider } from './context/PetProvider';

export const App = () => {

  const { isLoading, error } = useAuth0();

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <div>...is Loading</div>;
  }

  return (
      <PetProvider>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/callback" element={<DashBoard />} />
            <Route path="/account" element={<AccountPage />} />
          </Routes>
        </Router>
      </PetProvider>
  );
}
