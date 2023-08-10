
//React Imports
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//Native Imports
//Components
import { DashBoard } from './components/Dashboard/Dashboard';
import { RedirectToDashboard } from './components/Redirect/redirect';
import { AccountPage } from './components/AccountPage/AccountPage';
import { NavBar } from './components/NavBar/NavBar';

export const App = () => {
  return (
    <div>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/" element={<RedirectToDashboard />} />
          </Routes>
        </Router>
    </div>
  );
}
