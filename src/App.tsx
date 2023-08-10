
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DashBoard } from './components/Dashboard/Dashboard';

// Import your components here
import NavBar from './components/NavBar/NavBar';

export const App = () => {
  return (
    <div>
      <NavBar />
        <Router>
          <Routes>
              <Route path="/dashboard" element={<DashBoard />} />
          </Routes>
        </Router>
    </div>
  );
}
